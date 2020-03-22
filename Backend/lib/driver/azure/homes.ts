import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const insertHomeInfo = async (fullname: string, adminname: string, adminid: numId): Promise<Record<string, numId>> => {
    return runQuery(
        `INSERT INTO dbo.houses(full_name, admin_name, admin_id) VALUES (\'${fullname}\', \'${adminname}\', \'${adminid}\');
        declare @tempHouseId int;
        select @tempHouseId = MAX(dbo.houses.id)
        from dbo.houses
        where full_name = \'${fullname}\' and admin_name = \'${adminname}\' and admin_id = \'${adminid}\'

        INSERT INTO dbo.User2Houses(HouseId,userId) VALUES (@tempHouseId, \'${adminid}\');
        SELECT id FROM dbo.houses where id= (SELECT max(id) FROM dbo.houses);
        `
    );
};

export const getHomeInfo = async (userId: number): Promise<IUser2Home[]> => {
    return runQueryGetOne(`declare @Max as int
    declare @Current as int
    declare @tempHouseId as int
    declare @res as varchar(511)
    select @res = ''
    
    IF OBJECT_ID('tempdb..#temp_HouseInfo_Users') IS NOT NULL DROP TABLE #temp_HouseInfo_Users;  
    
    SELECT
        dbo.User2Houses.id,
        dbo.houses.full_name,
        dbo.houses.admin_name, dbo.houses.admin_id, dbo.User2Houses.HouseId, dbo.User2Houses.updated_by AS roommates
    INTO  #temp_HouseInfo_Users
    FROM
        dbo.User2Houses
        inner join 
        dbo.houses
    ON
        dbo.User2Houses.HouseId = dbo.houses.id
    where 
    
        
        dbo.User2Houses.userId = ${userId}
        
    
    
    
    
    select @Max = MAX(id)
    from #temp_HouseInfo_Users
    select @Current = 1;
    while (@Current <= @Max)
      Begin 
        select @tempHouseId = null;
        select @tempHouseId = c.HouseId
        from #temp_HouseInfo_Users as c
        where c.id = @Current
    
    
    
        IF OBJECT_ID('tempdb..#temp_Usename') IS NOT NULL DROP TABLE #temp_Usename;  
        select User2Houses.id, userName
        into #temp_Usename
        from User2Houses
        inner join
        users
        on User2Houses.userId = users.id
        where HouseId = @tempHouseId
    
        Declare @innerMax int
        Declare @innerCurrent int
        select @innerMax = MAX(id)
        from #temp_Usename
        select @innerCurrent = 1;
    
        UPDATE #temp_HouseInfo_Users
            SET #temp_HouseInfo_Users.roommates =''
            WHERE #temp_HouseInfo_Users.id = @Current;
    
        while (@innerCurrent <= @innerMax)
        Begin
            Declare @tempName nvarchar(255)
            select @tempName = null;
            select @tempName = #temp_Usename.userName
            from #temp_Usename
            where #temp_Usename.id =  @innerCurrent
    
            IF (@tempName is not null)
            UPDATE #temp_HouseInfo_Users
            
            SET #temp_HouseInfo_Users.roommates =#temp_HouseInfo_Users.roommates + @tempName + '  '
            WHERE #temp_HouseInfo_Users.id = @Current;
        
            
            
            select @innerCurrent = @innerCurrent+1;
        End
    
        select @Current = @Current+1;
    
      End
      select * from #temp_HouseInfo_Users`);
};

export const getHomeDetail = async (houseId: number): Promise<IUserInfo[]> => {
    return runQueryGetOne(`select dbo.users.*
    from dbo.User2Houses
    inner join dbo.users
    on dbo.User2Houses.userId = dbo.users.id
    where HouseId = ${houseId}`);
};

export const removeRoommate = async (userName: string, houseId: number): Promise<Boolean> => {
    return runQueryGetOne(`DELETE dbo.User2Houses FROM dbo.User2Houses 
    inner join dbo.users 
    on dbo.User2Houses.userId=dbo.users.id
    WHERE dbo.users.userName=\'${userName}\' and dbo.User2Houses.HouseId=${houseId}`);
};

export const getUserbalanceByHome = async (username: string, homeId: string): Promise<IUserBalanceResponse> => {
    return runQuery(`
            Declare @userId int

            select @userId = id
            from users
            where userName = \'${username}\'

            Select SUM(amount) as balance
            --Into   #Temp
            From   bills
            inner join users2bills
            on bills.id = users2bills.billId
            where bills.homeId =  ${homeId}
            and userId = @userId 
            and proofFlag = 0
            and ownerId != @userId`);
};
