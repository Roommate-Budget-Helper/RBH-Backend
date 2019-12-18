import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const insertHomeInfo = async (fullname: string, adminname: string, adminid: Number): Promise<Boolean> => {
    return runQueryGetOne(
        `INSERT INTO dbo.houses(full_name, admin_name, admin_id) VALUES (\'${fullname}\', \'${fullname}\', \'${adminid}\');
        declare @tempHouseId int;
        select @tempHouseId = MAX(dbo.houses.id)
        from dbo.houses
        where full_name = \'${fullname}\' and admin_name = \'${fullname}\' and admin_id = \'${adminid}\'

        INSERT INTO dbo.User2Houses(HouseId,userId) VALUES (@tempHouseId, \'${adminid}\');`
    )
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const getHomeInfo = async (userId: number): Promise<IUser2Home[]> => {
    return runQueryGetOne(`select dbo.houses.full_name,dbo.houses.admin_name,dbo.houses.admin_id
    from dbo.User2Houses
    inner join dbo.houses
    on dbo.houses.id = dbo.User2Houses.HouseId
    where userId = \'${userId}\'`);
};
