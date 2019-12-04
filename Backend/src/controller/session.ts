import _ from 'lodash';
import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const login: RequestHandler = async (req, res) => {
    const result = await Azure.auth.getUserInfo(`${req.query.username}`, `${req.query.password}`);
    
    return res.send(result);
};

export const register: RequestHandler = async (req, res) => {
    const result = await Azure.auth.insertUserInfo(`${req.query.username}`, `${req.query.password}`,`${req.query.email}`);
    return res.send(result);
};

export const logout: RequestHandler = async (req, res) => {
    return res.send('logout');
};
