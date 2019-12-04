import Bluebird from 'bluebird';
import sql from 'mssql';

export const client = {
    user: 'rmbhadmin',
    password: 'Jizhou*Huang',
    database: 'Roommate',
    server: 'rmbhdw1.database.windows.net',
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
