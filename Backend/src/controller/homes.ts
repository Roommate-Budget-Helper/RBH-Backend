import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createHome: RequestHandler = async (req, res) => {
    const result = await Azure.homes.insertHomeInfo(req.query.fullname, req.query.adminname, req.query.adminid);
    return res.send(result);
};

export const getHome: RequestHandler = async (req, res) => {
    const result = await Azure.homes.getHomeInfo(req.query.userId);
    return res.send(result);
}
