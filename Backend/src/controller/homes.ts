import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createHome: RequestHandler = async (req, res) => {
    const result: stringId = await Azure.homes.insertHomeInfo(req.query.fullname, req.query.adminname, req.query.adminid).then((result) => {
        return result['id'].toString() as stringId;
    });
    return res.send(result);
};

export const getHome: RequestHandler = async (req, res) => {
    const result = await Azure.homes.getHomeInfo(req.query.userId);
    return res.send(result);
};

export const getHomeDetail: RequestHandler = async (req, res) => {
    const result = await Azure.homes.getHomeDetail(req.query.houseId);
    return res.send(result);
};

export const removeRoommate: RequestHandler = async (req, res) => {
    const result = await Azure.homes.removeRoommate(req.query.userName, req.query.houseId);
    return res.send(result);
};

export const getUserbalanceByHome: RequestHandler = async (req, res) => {
    const balance = await Azure.homes.getUserbalanceByHome(req.query.userName, req.query.houseId);
    return res.send(balance);
};
