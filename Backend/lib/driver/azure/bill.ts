import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    return runQuery(
        `select * from dbo.bills where homeId = ${homeId}`
    );
};

export const createBill = async (ownerId: numId, homeId: numId, plannedSharedFlag: number, sharePlanid: number, totalAmount: number, roommates: string[]): Promise<boolean> => {
    return runQueryGetOne('');
};

export const getBillByUser = async (userId: numId): Promise<IBill[]> => {
    return runQueryGetOne(`select dbo.bills.*
    from dbo.bills 
    inner join dbo.users2bills 
    on dbo.bills.id = dbo.users2bills.billId 
    where dbo.users2bills.userId = ${userId}`);
};

