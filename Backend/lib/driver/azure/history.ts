import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
import { is } from 'bluebird';
//test
export const getHistory = async (userId: numId): Promise<IHistoryResponse[]> => {
    let history = [] as IHistoryResponse[];
    let map = new Map()
    // map.set("mean", {mean:"mean"})
    await runQueryGetOne(`SELECT billId from dbo.users2bills where userId = ${userId}`).then(async result => {
        let bills = result as IBillIdResponse[]
        for (let i = 0; i < bills.length; i++) {
            await runQuery(`SELECT ownerId from dbo.bills where id = ${bills[i].billId}`).then(async ownerId => {
                let isOwner = (ownerId as IBillOwnerIdResponse).ownerId == userId
                // console.info(bills)
                await runQueryGetOne(`SELECT userId, amount, proofFlag from dbo.users2bills where billId = ${bills[i].billId}`).then(async ids=> {

                    let users = ids as IBillUserIdResponse[]

                    let haveProof = false

                    for (let j = 0; j < users.length; j++) {
                        if (users[j].userId == userId) {
                            haveProof = users[j].proofFlag
                        }
                    }
                    // console.info(users)

                    for (let j = 0; j < users.length; j++) {
                        let user:IBillUsernameResponse = await runQuery(`SELECT userName from dbo.users where id = ${users[j].userId}`)
                        let userName = user.userName
                        if (users[j].userId != userId && users[j].userId == (ownerId as IBillOwnerIdResponse).ownerId) {
                            // console.info(userName)
                            if (map.has(userName)) {
                                let before = map.get(userName).balance
                                let count = map.get(userName).billCount
                                if (haveProof) {
                                    map.set(userName, { balance: before, billCount: count+1, homeCount: 0 })
                                } else {
                                    map.set(userName, { balance: before - users[j].amount, billCount: count+1, homeCount: 0 })
                                }
                            } else {
                                if (haveProof) {
                                    map.set(userName, { balance: 0, billCount: 1, homeCount: 0 })
                                } else {
                                    map.set(userName, { balance: 0 - users[j].amount, billCount: 1, homeCount: 0 })
                                }
                            }
                        } else if (isOwner&&users[j].userId != userId) {
                            if (map.has(userName)) {
                                let before = map.get(userName).balance
                                let count = map.get(userName).billCount
                                if (users[j].proofFlag) {
                                    map.set(userName, { balance: before, billCount: count+1, homeCount: 0 })
                                } else {
                                    map.set(userName, { balance: before + users[j].amount, billCount: count+1, homeCount: 0 })
                                }
                            } else {
                                if (users[j].proofFlag) {
                                    map.set(userName, { balance: 0, billCount: 1, homeCount: 0 })
                                } else {
                                    map.set(userName, { balance: 0 + users[j].amount, billCount: 1, homeCount: 0 })
                                }
                            }
                        }
                    }
                })
                // console.info(isOwner)
            })
        }
        console.info(map)
    })
    for(let name of map.keys()){
        let value = map.get(name)
        history.push({userName:name, balance: value.balance, billCount:value.billCount, homeCount:value.homeCount} as IHistoryResponse)
    }
    console.info("after", map)
    return history
};