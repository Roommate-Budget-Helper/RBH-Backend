import Bluebird from 'bluebird';
import sql, { ConnectionPool } from 'mssql';

export const client = {
    user: 'rbhDevelopers',
    password: 'RBH12138!',
    database: 'Roommate Budget Helper',
    server: 'rbhserver.database.windows.net',
    options: {
        encrypt: true
    }
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

export async function getConnection<T>(): Promise<sql.ConnectionPool> {
    return await new sql.ConnectionPool(client).connect();
}
