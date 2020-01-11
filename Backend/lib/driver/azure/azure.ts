import Bluebird from 'bluebird';
import sql from 'mssql';

export const client = {
    user: 'dev',
    password: 'devdev',
    database: 'Roommate',
    server: 'huangj3.csse.rose-hulman.edu'
    // options: {
    //     encrypt: true,
    // }
};

export async function runQuery<T>(query: string): Bluebird<T> {
    const result = await new sql.ConnectionPool(client).connect();
    const queryResult = await result.query(query);
    return queryResult.recordset[0] as any;
}

export async function runQueryGetOne<T>(query: string): Bluebird<T> {
    const result = await new sql.ConnectionPool(client).connect();
    const queryResult = await result.query(query);

    return queryResult.recordset as any;
}
