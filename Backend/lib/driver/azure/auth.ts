import { client, runQuery } from './azure';

//TODO
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    return runQuery(client, `SELECT * FROM USER WHERE user_name = ${username} and password = ${password}`);
};
