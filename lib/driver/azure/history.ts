import { runQuery, runQueryGetOne, getConnection } from './azure';
import * as _ from 'lodash';
import { is } from 'bluebird';
import sql from 'mssql';
// test
export const getHistory = async (userId: numId): Promise<IHistoryResponse[]> => {
    const connection = await getConnection();
    let request = new sql.Request(connection);
    request.input('userId', sql.Int, userId);
    const history = [] as IHistoryResponse[];
    const map = new Map();
    await request.query('SELECT billId from dbo.users2bills where userId = @userId').then(async (result) => {
        const bills = result.recordset as IBillIdResponse[];
        for (let i = 0; i < bills.length; i++) {
            request = new sql.Request(connection);
            request.input('billId', sql.Int, bills[i].billId);
            await request.query('SELECT ownerId from dbo.bills where id = @billId').then(async (ownerId) => {
                const isOwner = (ownerId.recordset[0] as IBillOwnerIdResponse).ownerId == userId;

                await request.query('SELECT userId, amount, proofFlag from dbo.users2bills where billId = @billId').then(async (ids) => {
                    const users = ids.recordset as IBillUserIdResponse[];
                    console.info("!!!", users)
                    let haveProof = false;
                    let am = 0;

                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userId == userId) {
                            haveProof = users[j].proofFlag;
                            am = users[j].amount
                        }
                    }

                    for (let j = 0; j < users.length; j++) {
                        request = new sql.Request(connection);
                        request.input('userId', sql.Int, users[j].userId);
                        const user: IBillUsernameResponse = await (await request.query('SELECT userName from dbo.users where id = @userId'))
                            .recordset[0];
                        const userName = user.userName;
                        if (users[j].userId != userId && users[j].userId == (ownerId.recordset[0] as IBillOwnerIdResponse).ownerId) {
                            if (map.has(userName)) {
                                const before = map.get(userName).balance;
                                const count = map.get(userName).billCount;
                                if (haveProof) {
                                    map.set(userName, { balance: before, billCount: count + 1, homeCount: 0 });
                                } else {
                                    map.set(userName, { balance: before - am, billCount: count + 1, homeCount: 0 });
                                }
                            } else {
                                if (haveProof) {
                                    map.set(userName, { balance: 0, billCount: 1, homeCount: 0 });
                                } else {
                                    map.set(userName, { balance: 0 - am, billCount: 1, homeCount: 0 });
                                }
                            }
                        } else if (isOwner && users[j].userId != userId) {
                            if (map.has(userName)) {
                                const before = map.get(userName).balance;
                                const count = map.get(userName).billCount;
                                if (users[j].proofFlag) {
                                    map.set(userName, { balance: before, billCount: count + 1, homeCount: 0 });
                                } else {
                                    map.set(userName, { balance: before + users[j].amount, billCount: count + 1, homeCount: 0 });
                                }
                            } else {
                                if (users[j].proofFlag) {
                                    map.set(userName, { balance: 0, billCount: 1, homeCount: 0 });
                                } else {
                                    map.set(userName, { balance: 0 + users[j].amount, billCount: 1, homeCount: 0 });
                                }
                            }
                        }
                    }
                });
            });
        }
    });
    for (const name of map.keys()) {
        const value = map.get(name);
        history.push({
            userName: name,
            balance: value.balance,
            billCount: value.billCount,
            homeCount: value.homeCount
        } as IHistoryResponse);
    }

    return history;
};
