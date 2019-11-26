import _ from 'lodash';
import { RequestHandler } from 'express';

import { AuthError, AuthErrorType } from '../../lib/error';

export const login: RequestHandler = async (req, res) => {
    res.send('login');
    return 'login';
};

export const register: RequestHandler = async (req, res) => {
    res.send('register');
    return 'register';
};

export const logout: RequestHandler = async (req, res) => {
    res.send('logout');
    return 'logout';
};
