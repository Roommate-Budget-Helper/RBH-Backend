import { runQuery } from './azure';

//test
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    console.info(`SELECT * FROM dbo.users WHERE userName= \'${username}\' and hashedPassword= \'${password}\'`);
    return runQuery(`SELECT * FROM dbo.users WHERE userName= \'${username}\' and hashedPassword= \'${password}\'`);
};
