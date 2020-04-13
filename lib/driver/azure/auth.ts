import { runQuery, runQueryGetOne, getConnection } from './azure';
import * as _ from 'lodash';
import sql from 'mssql';
//test
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo | boolean> => {
    const connection = await getConnection()
    const request = new sql.Request(connection)
    request.input('username', sql.VarChar, username)
    request.input('password', sql.VarChar, password)
    return (await request.query(`SELECT * FROM dbo.users WHERE userName= @username and hashedPassword= @password`)).recordset[0] as any   ;
};

export const insertUserInfo = async (username: string, password: string, email: string): Promise<IAuthResponse> => {
    const getResult = await getUserInfo(username, password);
    if (_.isEmpty(getResult)) {
        const connection = await getConnection()
        const request = new sql.Request(connection)
        request.input('username', sql.VarChar, username);
        request.input('password', sql.VarChar, password);
        request.input('email', sql.VarChar, email);

        return (await request.query(`INSERT INTO dbo.users (userName, hashedPassword, email, balance)
        VALUES (@username, @password, @email, 0);`)).recordset as any
    } else {
        //check err typre in the future
        return { isRegistered: false } as IAuthResponse;
    }
};