import { runQuery } from './azure';

//TODO
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    return (await runQuery('dbo.test1')) as any;
};
