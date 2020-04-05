import { runQuery, runQueryGetOne, getConnection } from './azure';
import * as _ from 'lodash';
import sql from 'mssql';
import { request } from 'express';


export const getBillByHome = async (homeId: numId): Promise<IBill[]> => {
    const connection = await getConnection()
    const request = new sql.Request(connection)
    request.input('homeId', sql.Int, homeId)
    return (await request.query(`select * from dbo.bills where homeId = @homeId`)).recordset;
};

export const createUser2Bill = async (
    billId: number,
    roommates: string[],
    amount: number[],
    proportion: number[],
    sharePlanid: number,
    planId: number
) => {
    const connection = await getConnection()
    for (let i = 0; i < roommates.length; i++) {
        var userId;
        const request = new sql.Request(connection)
        request.input('roommate', sql.VarChar, roommates[i])
        // tslint:disable-next-line: no-floating-promises
        await request.query(`SELECT id FROM dbo.users WHERE userName = @roommate`).then(async (result) => {
            userId = (result.recordset[0] as IBillCreateResponse).id;
            const request1 = new sql.Request(connection)
            request1.input('billId', sql.Int, billId)
            request1.input('userId', sql.Int, userId)
            request1.input('proportion', sql.Int, proportion[i])
            request1.input('amount', sql.Int, amount[i])

            console.info('userId', userId, roommates[i], roommates[i].length, result);
            await request1.query(`INSERT INTO dbo.users2bills (billId, userId, proportion, amount, proofFlag, isApproved)
            VALUES (@billId, @userId, @proportion, @amount, 0, 0)
            SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`);
        });
        // tslint:disable-next-line: no-floating-promises
        if (sharePlanid == -1) {
            // tslint:disable-next-line: no-floating-promises
            const request2 = new sql.Request(connection)
            request2.input('planId', sql.Int, planId)
            request2.input('roommate', sql.VarChar, roommates[i])
            request2.input('proportion', sql.Int, proportion[i])
            await request2.query(
                `INSERT INTO dbo.shareRatioId (sharePlansid, userName, ratio) VALUES (@planId, @roommate, @proportion)`
            );
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
    proportion: number[],
    billname: string,
    billdescri: string,
    isRecurrent: number,
    isRecurrentDateTime: Date,
    recurrentInterval: number,
    created_at: Date,
    created_by: string
): Promise<numId> => {
    var billId = 0;
    var planId: number;
    const connection = await getConnection()
    // if this is not stored as a shared plan, the plannedSharedFlag from frontend would be 0
    if (isRecurrent == 1) {
        const request = new sql.Request(connection)
        request.input('homeId', sql.Int, homeId)
        request.input('isRecurrentDateTime', sql.Date, isRecurrentDateTime)
        request.input('recurrentInterval', sql.Int, recurrentInterval)
        request.input('ownerId', sql.Int, ownerId)
        request.input('billName', sql.VarChar, billname)
        request.input('billdescri', sql.VarChar, billdescri)

        await request.query(`INSERT INTO dbo.sharePlans (HouseId, isRecurent, isRecurentdatetime, recurrentInterval, billOwner, full_name,billDescri ) VALUES 
        (@homeId, 1,@isRecurrentDateTime}, @recurrentInterval, @ownerId, @billname}, @billdescri})
            SELECT id FROM dbo.sharePlans where id= (SELECT max(id) FROM dbo.sharePlans)`).then(async (planResult) => {
            planId = (planResult.recordset[0] as IBillCreateResponse).id;

            for (let i = 0; i < roommates.length; i++) {
                const request1 = new sql.Request(connection)
                request1.input('planId', sql.Int, planId)
                request1.input('roommate', sql.VarChar, roommates[i])
                request1.input('proportion', sql.Int, proportion[i])
                await request1.query(
                    `INSERT INTO dbo.shareRatioId (sharePlansid, userName, ratio) VALUES (@planId, @roommate, @proportion)`
                );
            }
        });
        return 0;
    }

    if (plannedSharedFlag == 0) {
        // tslint:disable-next-line: no-floating-promises
        const request2 = new sql.Request(connection)
        request2.input('homeId', sql.Int, homeId)
        request2.input('plannedSharedFlag', sql.Int, plannedSharedFlag)
        request2.input('totalAmount', sql.Int, totalAmount)
        request2.input('ownerId', sql.Int, ownerId)
        request2.input('billName', sql.VarChar, billname)
        request2.input('billdescri', sql.VarChar, billdescri)
        request2.input('isRecurrent', sql.Int, isRecurrent)
        request2.input('created_at', sql.Date, created_at)
        request2.input('created_by', sql.VarChar, created_by)

        await request.query(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, totalAmount, isResolved, billName, descri,isRecurrent,  created_at, created_by)
        VALUES (@ownerId,@homeId,@plannedSharedFlag,@totalAmount,0, @billname,@billdescri,@isRecurrent, @created_at,@created_by)
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`).then(async (result) => {
            billId = (result.recordset[0] as IBillCreateResponse).id;
            await createUser2Bill(billId, roommates, amount, proportion, 0, 0);
        });
    } else {
        // if this is a newly created shareplan, the sharePlanid from frontend would be -1

        if (sharePlanid == -1) {

            await runQuery(`INSERT INTO dbo.sharePlans (full_name, HouseId, isRecurent) VALUES (\'${full_name}\', ${homeId}, 0)
            SELECT id FROM dbo.sharePlans where id= (SELECT max(id) FROM dbo.sharePlans)`).then(async (planResult) => {
                planId = (planResult as IBillCreateResponse).id;
                const request3 = new sql.Request(connection)
                request3.input('homeId', sql.Int, homeId)
                request3.input('plannedSharedFlag', sql.Int, plannedSharedFlag)
                request3.input('totalAmount', sql.Int, totalAmount)
                request3.input('ownerId', sql.Int, ownerId)
                request3.input('billName', sql.VarChar, billname)
                request3.input('billdescri', sql.VarChar, billdescri)
                request3.input('isRecurrent', sql.Int, isRecurrent)
                request3.input('created_at', sql.Date, created_at)
                request3.input('created_by', sql.VarChar, created_by)
                await runQuery(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved, billName, descri, created_at, created_by)
                VALUES (@ownerId,@homeId,@plannedSharedFlag,@planId,@totalAmount,0, @billname, @billdescri, @created_at, @created_by)
                SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`).then(async (billResult) => {
                    billId = (billResult as IBillCreateResponse).id;

                    await createUser2Bill(billId, roommates, amount, proportion, sharePlanid, planId);
                });
            });
        }
        //else it would be a used shareplan
        else {
            await runQuery(`INSERT INTO dbo.bills (ownerId, homeId, plannedSharedFlag, sharePlanid, totalAmount, isResolved,billName, descri, created_at, created_by)
        VALUES (${ownerId},${homeId},${plannedSharedFlag},${sharePlanid},${totalAmount},0, \'${billname}\', \'${billdescri}\', \'${created_at}\', \'${created_by}\')
        SELECT id FROM dbo.bills where id= (SELECT max(id) FROM dbo.bills)`).then(async (result) => {
                billId = (result as IBillCreateResponse).id;
                await createUser2Bill(billId, roommates, amount, proportion, sharePlanid, 0);
            });
        }
    }

    return billId;
};

export const getBillByUser = async (userId: numId): Promise<IBill[]> => {
    return runQuery(`select dbo.bills.*
    from dbo.bills 
    inner join dbo.users2bills 
    on dbo.bills.id = dbo.users2bills.billId 
    where dbo.users2bills.userId = ${userId}`);
};

export const getBillById = async (billId: numId): Promise<IBillDetail[]> => {
    return runQueryGetOne(`
                        WITH cte_bill_house (billId, ownerId, homeId, sharePlanid, totalAmount, billName,
                        descri,created_at,user2billId, userId,proportion, amount, proof) AS (
                        SELECT
                            dbo.bills.id,
                            dbo.bills.ownerId,
                            dbo.bills.homeId,
                            dbo.bills.sharePlanid,
                            dbo.bills.totalAmount,
                            dbo.bills.billName,
                            dbo.bills.descri,
                            dbo.bills.created_at,
                            dbo.users2bills.id,
                            dbo.users2bills.userId,
                            dbo.users2bills.proportion,
                            dbo.users2bills.amount,
                            dbo.users2bills.proof

                        FROM    
                            dbo.bills
                            INNER JOIN dbo.users2bills
                        on 
                            dbo.bills.id = dbo.users2bills.billId
                        )

                        select cte_bill_house.*,dbo.users.userName
                        from cte_bill_house
                        inner join dbo.users
                        on dbo.users.id = cte_bill_house.userId
                        where billId=${billId}`);
};

export const deleteBill = async (billid: numId): Promise<Boolean> => {
    // console.log(billid);
    return runQueryGetOne(`
    DELETE FROM dbo.users2bills where billId = ${billid}
    DELETE FROM dbo.bills WHERE id = ${billid}`);
};

export const markAsResolved = async (billid: numId): Promise<Boolean> => {
    return runQuery(`UPDATE dbo.bills
        SET isResolved = 1
        WHERE id = ${billid}`);
};

export const getSharePlanValue = async (houseId: numId): Promise<IBillSharePlan[]> => {
    const returnValue: IBillSharePlanReturnValue[] = await runQueryGetOne(
        `SELECT id, full_name from dbo.sharePlans where dbo.sharePlans.HouseId = ${houseId} and isRecurent = 0`
    );
    const sharePlans: IBillSharePlan[] = await getSharePlans(returnValue);
    return sharePlans;
};

export const getSharePlans = async (result: IBillSharePlanReturnValue[]): Promise<IBillSharePlan[]> => {
    var sharePlans = [] as IBillSharePlan[];
    var roommates = [] as string[];
    var prop = [] as number[];
    var id = [] as number[];
    var name = [] as string[];
    if (!result) {
        return sharePlans;
    }
    var promises = result.map((element) => {
        id.push(element.id);
        name.push(element.full_name);
        return runQueryGetOne(`SELECT dbo.shareRatioId.userName, dbo.shareRatioId.ratio FROM dbo.shareRatioId
                where dbo.shareRatioId.sharePlansid = ${id[id.length - 1]}`)
            .then((ratios) => {
                if (!ratios) {
                    return sharePlans;
                }
                (ratios as IBillShareRatioReturnValue[]).forEach((pair) => {
                    roommates.push(pair.userName);
                    prop.push(pair.ratio);
                });
                sharePlans.push({ id: element.id, full_name: element.full_name, userName: roommates, ratio: prop });
                prop = [];
                roommates = [];
            })
            .then(() => {
                prop = [];
                roommates = [];
                return sharePlans;
            });
    });

    return Promise.all(promises).then((results) => {
        return results[0];
    });
};

export const editBillById = async (billDetails: IBillDetail[]): Promise<Boolean> => {
    let date: Date = new Date()
    console.info(date.toISOString())
    billDetails.map((billDetail: IBillDetail) => {
        return runQueryGetOne(`
                        UPDATE dbo.bills
                        SET billName = \'${billDetail.billName}\',
                        totalAmount = ${billDetail.totalAmount},
                        descri = \'${billDetail.descri}\',
                        created_at = \'${date.toISOString()}\'
                        where id = ${billDetail.billId}

                        update dbo.users2bills
                        set proportion = ${billDetail.proportion},
                        amount = ${billDetail.totalAmount}*${billDetail.proportion}
                        where billId = ${billDetail.billId} and userId = ${billDetail.userId}`);
    });
    return true;
};

export const getRecurrentBill = async (houseId: numId): Promise<IBillRecurrent[]> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('houseId', sql.Int, houseId);
    const returnValue: IBillRecurrentReturnValue[] = (await request.query(
        `SELECT id,billOwner, billDescri, full_name, isRecurentdatetime, recurrentInterval from dbo.sharePlans where dbo.sharePlans.HouseId = @houseId and isRecurent = 1`
    )).recordset;
    const recurrentBills: IBillRecurrent[] = await getRecurrent(returnValue);

    return recurrentBills;
};

export const getRecurrent = async (result: IBillRecurrentReturnValue[]): Promise<IBillRecurrent[]> => {
    var Recurrentbills = [] as IBillRecurrent[];

    var roommates = [] as string[];
    var prop = [] as number[];
    var id = [] as number[];
    var name = [] as string[];
    if (!result) {
        return Recurrentbills;
    }
    const connection = await getConnection();
    const request = new sql.Request(connection);
    var promises = result.map((element) => {
        id.push(element.id);
        name.push(element.full_name);
        request.input('elementId', sql.Int, element.id);
        return request.query(`SELECT dbo.shareRatioId.userName, dbo.shareRatioId.ratio FROM dbo.shareRatioId
                where dbo.shareRatioId.sharePlansid = @elementId`)
            .then((ratios) => {
                if (!ratios) {
                    return Recurrentbills;
                }
                (ratios.recordset as IBillShareRatioReturnValue[]).forEach((pair) => {
                    roommates.push(pair.userName);
                    prop.push(pair.ratio);
                });

                Recurrentbills.push({
                    id: element.id,
                    ownerId: element.billOwner,
                    full_name: element.full_name,
                    descri: element.billDescri,
                    userName: roommates,
                    ratio: prop,
                    isRecurentdatetime: element.isRecurentdatetime,
                    recurrentInterval: element.recurrentInterval
                });
                prop = [];
                roommates = [];
            })
            .then(() => {
                prop = [];
                roommates = [];
                return Recurrentbills;
            });
    });

    return Promise.all(promises).then((results) => {
        return results[0];
    });
};

export const updateRecurrent = async (planId: numId, newDate: Date): Promise<Boolean> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('planId', sql.Int, planId);
    request.input('newDate', sql.Date, newDate);
    return request.query(`UPDATE dbo.sharePlans SET isRecurentdatetime = @newDate' where id = @planId`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

export const getProofById = async (users2bills: numId): Promise<FileList> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('users2bills', sql.Int, users2bills);
    return (await request.query(`SELECT proof FROM dbo.users2bills WHERE id = @users2bills`)).recordset[0];
};

export const uploadProofById = async (userId: numId, billId: numId, baseString: string): Promise<Boolean> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('billId', sql.Int, billId);
    request.input('userId', sql.Int, userId);
    request.input('baseString', sql.VarChar, baseString);
    return request.query(`UPDATE dbo.users2bills
    SET proof = @baseString, proofFlag = 1
    where userId = @userId and billId = @billId`).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
};

export const getBillHistoryById = async (billId: numId): Promise<IBillHistory[]> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('billId', sql.Int, billId);
    return (await request.query(`select * from dbo.billHistory where currentID = @billId`)).recordset;
};

export const createBillHistory = async (billHistory: IBillHistory): Promise<Boolean> => {
    const connection = await getConnection();
    const request = new sql.Request(connection);
    request.input('ownerId', sql.Int, billHistory.ownerId);
    request.input('homeId', sql.Int, billHistory.homeId);
    request.input('totalAmount', sql.Float, billHistory.totalAmount);
    request.input('currentID', sql.Int, billHistory.currentID);
    request.input('billName', sql.VarChar, billHistory.billName);
    request.input('descri', sql.VarChar, billHistory.descri);
    request.input('created_at', sql.Date, billHistory.created_at);
    request.input('created_by', sql.VarChar, billHistory.created_by);
    return request.query(`INSERT INTO dbo.billHistory (ownerId, homeId, totalAmount, currentID, billName, descri, created_at, created_by)
    VALUES (@ownerId, @homeId, @totalAmount, @currentID,@billName, @descri, @created_at, @created_by)`).then(()=>{
        return true;
    }).catch(() => {
        return false;
    })
};