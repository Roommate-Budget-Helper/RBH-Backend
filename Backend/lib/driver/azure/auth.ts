import { client, runQuery } from './azure';

//TODO
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    const result = await runQuery('dbo.test1');
    
    return result;
};
