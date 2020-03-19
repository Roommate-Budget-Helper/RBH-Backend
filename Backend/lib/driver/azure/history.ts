import { runQuery, runQueryGetOne } from './azure';
import * as _ from 'lodash';
//test
export const getHistory = async (userId: numId): Promise<IHistoryResponse> => {
    await runQueryGetOne(`SELECT billId from dbo.users2bills where userId = ${userId}`).then(async result => {
        console.info(result)
    })
    return null as unknown as IHistoryResponse
};