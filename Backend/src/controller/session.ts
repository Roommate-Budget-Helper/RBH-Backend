import _ from 'lodash';
import { RequestHandler } from 'express';
import { AuthError, AuthErrorType } from '../../lib/error';
import * as Azure from '../../lib/driver/azure/index';

export const login: RequestHandler = async (req, res) => {
    //Example

    // if (_.isEmpty(req)) {
    //     throw new AuthError(AuthErrorType.WrongPassword, 'xxx');
    // }

    // Azure.auth.getUserInfo(req.query.username, req.query.password);

    return res.send('login');
};

export const register: RequestHandler = async (req, res) => {
    return res.send('register');
};

export const logout: RequestHandler = async (req, res) => {
    return res.send('logout');
};
