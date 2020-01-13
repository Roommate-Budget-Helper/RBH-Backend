import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    return runQuery(
        `select * from dbo.bills where homeId = ${homeId}`
    );
};

export const createBill = async (ownerId: numId, homeId: numId, plannedSharedFlag: number, sharePlanid: number, totalAmount: number, roommates: string[], amount: number[], proportion: number[]): Promise<boolean> => {
    let billId = runQueryGetOne(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved)
    VALUES (${ownerId},${homeId},${plannedSharedFlag},${sharePlanid},${totalAmount},0)`)
    console.info(billId)
    for (let i = 0; i < roommates.length; i++) {
        let userId = runQueryGetOne(`SELECT userName FROM dbo.users WHERE userName = ${roommates[i]}`)
        console.info(userId)
        runQuery(`INSERT INTO dbo.users2bills (billId, userId, proportion, amount, proofFlag, isApproved, proof)
        VALUES (${billId}, ${userId}, ${proportion[i]}, ${amount[i]}, 0, 0, 0)`)
      }
    return true;
};

export const getBillByUser = async (userId: numId): Promise<IBill[]> => {
    return runQuery(`select dbo.bills.*
    from dbo.bills 
    inner join dbo.users2bills 
    on dbo.bills.id = dbo.users2bills.billId 
    where dbo.users2bills.userId = ${userId}`);
};

