import { runQuery } from './azure';

//test
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    return runQuery('SELECT * FROM dbo.users');
};
