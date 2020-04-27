import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createHome: RequestHandler = async (req, res) => {
    const result: stringId = await Azure.homes
        .insertHomeInfo(req.query.fullname as any, req.query.adminname as any, req.query.adminid as any)
        .then((result: any) => {
            return result['id'].toString() as stringId;
        });
    return res.send(result);
};

export const getHome: RequestHandler = async (req, res) => {
    const result = await Azure.homes.getHomeInfo(req.query.userId as any);
    return res.send(result);
};

export const getHomeDetail: RequestHandler = async (req, res) => {
    const result = await Azure.homes.getHomeDetail(req.query.houseId as any);
    return res.send(result);
};

export const removeRoommate: RequestHandler = async (req, res) => {
    const result = await Azure.homes.removeRoommate(req.query.userName as any, req.query.houseId as any);
    return res.send(result);
};

export const getUserbalanceByHome: RequestHandler = async (req, res) => {
    const balance = await Azure.homes.getUserbalanceByHome(req.query.userName as any, req.query.houseId as any);
    return res.send(balance);
};

export const deleteHome: RequestHandler = async (req, res) => {
    const result = await Azure.homes.deleteHome(req.query.houseId as any);
    return res.send(result);
};

export const transferOwner: RequestHandler = async (req, res) => {
    const result = await Azure.homes.transferOwner(req.query.houseId as any, req.query.userName as any);
    return res.send(result);
};
