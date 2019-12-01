import _ from 'lodash';
import { RequestHandler } from 'express';
import { AuthError, AuthErrorType } from '../../lib/error';
import * as Azure from '../../lib/driver/azure/index';

export const login: RequestHandler = async (req, res) => {
    //Example

    // if (_.isEmpty(req)) {
    //     throw new AuthError(AuthErrorType.WrongPassword, 'xxx');
    // }
    
    const result = await Azure.auth.getUserInfo('huangj3', '123');
    return res.send(`${result}`);
};

export const register: RequestHandler = async (req, res) => {
    return res.send('register');
};

export const logout: RequestHandler = async (req, res) => {
    return res.send('logout');
};
