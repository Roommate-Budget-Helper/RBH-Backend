import { getConnection } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';
import sql from 'mssql';
import {deleteBill} from './bill'

export const insertHomeInfo = async (fullname: string, adminname: string, adminid: numId): Promise<Record<string, numId>> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('fullname', sql.VarChar, fullname);
    request.input('adminname', sql.VarChar, adminname);
    request.input('adminid', sql.Int, adminid);
    return (await request.query(
        `INSERT INTO dbo.houses(full_name, admin_name, admin_id) VALUES (@fullname, @adminname, @adminid);
        declare @tempHouseId int;
        select @tempHouseId = MAX(dbo.houses.id)
        from dbo.houses
        where full_name = @fullname and admin_name = @adminname and admin_id = @adminid

        INSERT INTO dbo.User2Houses(HouseId,userId) VALUES (@tempHouseId, @adminid);
        SELECT id FROM dbo.houses where id= (SELECT max(id) FROM dbo.houses);
        `
    )).recordset[0];
};

export const getHomeInfo = async (userId: number): Promise<IUser2Home[]> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('userId', sql.Int, userId);
    return (await request.query(`declare @Max as int
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
    
        
        dbo.User2Houses.userId = @userId
        
    
    
    
    
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
      select * from #temp_HouseInfo_Users`)).recordset;
};

export const getHomeDetail = async (houseId: number): Promise<IUserInfo[]> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('houseId', sql.Int, houseId);
    return (await request.query(`select dbo.users.*
    from dbo.User2Houses
    inner join dbo.users
    on dbo.User2Houses.userId = dbo.users.id
    where HouseId = @houseId`)).recordset;
};

export const removeRoommate = async (userName: string, houseId: number): Promise<Boolean> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('userName', sql.VarChar, userName);
    request.input('houseId', sql.Int, houseId);
    return (await request.query(`DELETE dbo.User2Houses  FROM dbo.User2Houses 
    inner join dbo.users 
    on dbo.User2Houses.userId=dbo.users.id
    WHERE dbo.users.userName=@userName and dbo.User2Houses.HouseId=@houseId`)).recordset as any;
};

export const getUserbalanceByHome = async (username: string, homeId: string): Promise<IUserBalanceResponse> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('username', sql.VarChar, username);
    request.input('homeId', sql.VarChar, homeId);
    return (await request.query(`
            Declare @userId int

            select @userId = id
            from users
            where userName = @username

            Select SUM(amount) as balance
            --Into   #Temp
            From   bills
            inner join users2bills
            on bills.id = users2bills.billId
            where bills.homeId =  @homeId
            and userId = @userId 
            and proofFlag = 0
            and ownerId != @userId`)).recordset[0];
};

export const deleteHome = async (houseId: number): Promise<Boolean> => {
    console.info(houseId)
    const connection = await getConnection();
    const request1 = new sql.Request(connection);
    const request2 = new sql.Request(connection);
    request1.input('houseId', sql.Int, houseId)
    request2.input('houseId', sql.Int, houseId)

    await request1.query(`SELECT * from dbo.bills where homeId=@houseId`).then(result => {
        let bills = result.recordset
        console.info(bills)
        bills.forEach(bill=>{
            deleteBill(bill.id)
        })
    })
    await request2.query(`SELECT * from dbo.sharePlans where HouseId=@houseId`).then(result => {
        let plans = result.recordset
        console.info(plans)
        plans.forEach(plan => {
            const request3 = new sql.Request(connection);
            request3.input('planId', sql.Int, plan.id)
            request3.query(`DELETE FROM dbo.shareRatioId where sharePlansid = @planId`)
        })
    }).finally( ()=>
        request2.query(`DELETE from dbo.sharePlans where HouseId=@houseId
        DELETE from dbo.invitations where houseId = @houseId`)
    )
    const request = new sql.Request(connection);
    request.input('houseId', sql.Int, houseId);
    return (request.query(`DELETE FROM dbo.houses WHERE id = @houseId`)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        }));
};

export const transferOwner = async (houseId: number, userName: string): Promise<Boolean> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('houseId', sql.Int, houseId);
    request.input('userName', sql.VarChar, userName);
    return (request.query(`UPDATE dbo.houses
        SET admin_name = @userName
        WHERE id = @houseId`)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        }));
};
