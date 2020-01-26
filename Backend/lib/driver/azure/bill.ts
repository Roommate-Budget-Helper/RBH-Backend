import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { promises } from 'dns';

export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    return runQueryGetOne(`select * from dbo.bills where homeId = ${homeId}`);
};

const createUser2Bill = async (
    billId: number,
    roommates: string[],
    amount: number[],
    proportion: number[],
    sharePlanid: number,
    planId: number
) => {
    for (let i = 0; i < roommates.length; i++) {
        let userId;
        // tslint:disable-next-line: no-floating-promises
        runQuery(`SELECT id FROM dbo.users WHERE userName = \'${roommates[i]}\'`).then(async (result) => {
            userId = (result as IBillCreateResponse).id;
            await runQuery(`INSERT INTO dbo.users2bills (billId, userId, proportion, amount, proofFlag, isApproved, proof)
            VALUES (${billId}, ${userId}, ${proportion[i]}, ${amount[i]}, 0, 0, 0)
            SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`);
        });
        // tslint:disable-next-line: no-floating-promises
        if (sharePlanid == -1) {
            // tslint:disable-next-line: no-floating-promises
            runQuery(`INSERT INTO dbo.shareRatioId (sharePlansid, userName, ratio) VALUES (${planId}, ${roommates[i]}, ${proportion[i]})`);
        }
    }
};

export const createBill = async (
    ownerId: numId,
    homeId: numId,
    plannedSharedFlag: number,
    sharePlanid: number,
    full_name: string,
    totalAmount: number,
    roommates: string[],
    amount: number[],
    proportion: number[]
): Promise<boolean> => {
    let billId;
    let planId;
    if (plannedSharedFlag == 0) {
        // tslint:disable-next-line: no-floating-promises
        runQuery(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, totalAmount, isResolved)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${totalAmount},0)
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`).then(async (result) => {
            billId = (result as IBillCreateResponse).id;
            await createUser2Bill(billId, roommates, amount, proportion, 0, 0);
        });
    } else {
        if (sharePlanid == -1) {
            planId = runQuery(`INSERT INTO dbo.sharePlans (full_name, HouseId) VALUES(\'${full_name}\', ${homeId})
            SELECT id FROM dbo.sharePlans where id= (SELECT max(id) FROM dbo.sharePlans`);
            billId = runQueryGetOne(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${planId},${totalAmount},0)
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`);
        } else {
            billId = runQueryGetOne(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${sharePlanid},${totalAmount},0)
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`);
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
    return runQuery(`DELETE FROM dbo.bills WHERE id = ${billid}`);
};

export const markAsResolved = async (billid: numId): Promise<Boolean> => {
    return runQuery(`UPDATE dbo.bills
        SET isResolved = 1
        WHERE id = ${billid}`);
};

export const getSharePlans = async (houseId: numId): Promise<IBillSharePlan[]> => {
    let sharePlans = [] as IBillSharePlan[];
    let roommates = [] as string[];
    let prop = [] as number[];
    let id = [] as number[];
    let name = [] as string[];

    await runQuery(`SELECT id, full_name from dbo.sharePlans where dbo.sharePlans.HouseId = ${houseId}`).then(async (result) => {
        (result as IBillSharePlanReturnValue[]).forEach(async (element) => {
            id.push(element.id);
            name.push(element.name);
            await runQuery(`SELECT dbo.shareRatioId.userName, dbo.shareRatioId.ratio FROM dbo.shareRatioId
                where dbo.shareRatioId.sharePlansid = ${id[id.length - 1]}`).then((ratios) => {
                (ratios as IBillShareRatioReturnValue[]).forEach(async (pair) => {
                    roommates.push(pair.roommates);
                    prop.push(pair.proportion);
                });
                sharePlans.push({ id: id[id.length - 1], name: name[name.length - 1], roommates: roommates, proportion: prop });
            });
            prop = [];
            roommates = [];
        });
    });

    return sharePlans;
};