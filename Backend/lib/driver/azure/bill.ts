import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    return runQuery(
        `select * from dbo.bills where homeId = ${homeId}`
    );
};

export const createBill = async (ownerId: numId, homeId: numId, plannedSharedFlag: number, sharePlanid: number, full_name: string, totalAmount: number, roommates: string[], amount: number[], proportion: number[]): Promise<boolean> => {
    let billId
    let planId
    if(plannedSharedFlag==0){
        billId = runQueryGetOne(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, totalAmount, isResolved)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${totalAmount},0)`)
    }else{
        if(sharePlanid==-1){
            planId = runQuery(`INSERT INTO dbo.sharePlans (full_name, HouseId) VALUES(\'${full_name}\', ${homeId})
            SELECT id FROM dbo.sharePlans where id= (SELECT max(id) FROM dbo.sharePlans`)
        }
        billId = runQueryGetOne(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${planId},${totalAmount},0)
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills`)
    }
    console.info(billId, planId)
    for (let i = 0; i < roommates.length; i++) {
        let userId = runQuery(`SELECT id FROM dbo.users WHERE userName = ${roommates[i]}`)
        console.info(userId)
        runQuery(`INSERT INTO dbo.users2bills (billId, userId, proportion, amount, proofFlag, isApproved, proof)
        VALUES (${billId}, ${userId}, ${proportion[i]}, ${amount[i]}, 0, 0, 0)`)
        if(sharePlanid==-1){
        runQuery(`INSERT INTO dbo.shareRatioId (sharePlansid, userName, ratio) VALUES (${planId}, ${roommates[i]}, ${proportion[i]})`)
        }
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

export const deleteBill = async (billid: numId): Promise<Boolean> => {
    return runQuery(`DELETE FROM dbo.bills WHERE id = ${billid}`)
}

export const markAsResolved = async (billid: numId): Promise<Boolean> => {
    return runQuery(`UPDATE dbo.bills
        SET isResolved = 1
        WHERE id = ${billid}`)
}



