import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    return runQuery(
        `
        `
    );
};


export const createBill = async (ownerId: numId, homeId:numId, internalFlag: number,plannedSharedFlag: number,
    sharePlanid: number,proportion: number,totalAmount: number): Promise<Boolean> => {
    return runQueryGetOne(`INSERT INTO dbo.bills(ownerId, homeId, internalFlag,plannedSharedFlag,
        sharePlanid,proportion,totalAmount) VALUES (\'${ownerId}\', \'${homeId}\', \'${internalFlag}\', \'${plannedSharedFlag}\', 
        \'${sharePlanid}\', \'${proportion}\', \'${totalAmount}\');
    declare @tempHouseId int;
    select @tempHouseId = MAX(dbo.houses.id)
    from dbo.houses
    where full_name = \'${fullname}\' and admin_name = \'${fullname}\' and admin_id = \'${adminid}\'

    INSERT INTO dbo.User2Houses(HouseId,userId) VALUES (@tempHouseId, \'${adminid}\');
    SELECT id FROM dbo.houses where id= (SELECT max(id) FROM dbo.houses);`);
};

export const getBillByUser = async (userId: numId): Promise<IBill[]> => {
    return runQueryGetOne(``);
};

