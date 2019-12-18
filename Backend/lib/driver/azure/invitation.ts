import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const insertInvitationInfo = async (userId: number, houseId: number): Promise<Boolean> => {
    return runQueryGetOne(
        `declare @tempUserName nvarchar(255);
        declare @tempHouseName nvarchar(255);
        
        select @tempUserName = dbo.users.full_name
        from dbo.users
        where users.id = ${userId}
        
        select @tempHouseName = dbo.houses.full_name
        from dbo.houses
        where houses.id = ${houseId}
        
        insert into dbo.invitations(userName, houseName, userId, houseId) VALUES (@tempUserName,@tempHouseName,${userId},${houseId});`
    )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const getInvitationInfo = async (userId: number): Promise<IInvitation[]> => {
    return runQueryGetOne(`
    select *
    from dbo.invitations
    where id = ${userId}
    `);
};