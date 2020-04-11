import _ from 'lodash';
import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';
import * as jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
    const loginInfo: IUserInfo | boolean = await Azure.auth.getUserInfo(`${req.query.username}`, `${req.query.password}`);
    const temp = jwt.sign({ username: req.query.username }, 'abcde', { expiresIn: 20 * 60 });
    const result = { userInfo: loginInfo, token: temp } as ILoginResponse;
    return res.send(result);
};

export const register: RequestHandler = async (req, res) => {
    const result = await Azure.auth.insertUserInfo(`${req.query.username}`, `${req.query.password}`, `${req.query.email}`);
    return res.send(result);
};

export const logout: RequestHandler = async (req, res) => {
    return res.send('logout');
};
