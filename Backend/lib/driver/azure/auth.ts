import { runQuery } from './azure';
import * as _ from 'lodash';
//test
export const getUserInfo = async (username: string, password: string): Promise<IUserInfo> => {
    return runQuery(`SELECT * FROM dbo.users WHERE userName= \'${username}\' and hashedPassword= \'${password}\'`);
};

export const insertUserInfo = async (username: string, password: string, email:string): Promise<IAuthResponse> => {
    const getResult = await getUserInfo(username,password);
    if(_.isEmpty(getResult)){
       return runQuery(`INSERT INTO dbo.users (userName, hashedPassword, email, balance)
       VALUES (\'${username}\', \'${password}\', \'${email}\', 0);`);
    }else{
        return {isRegistered:false} as IAuthResponse;
    }
};