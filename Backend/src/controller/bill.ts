import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';


export const createBill: RequestHandler = async (req, res) => {
    const result: boolean = await Azure.bill.createBill(req.query.ownerId, req.query.homeId, req.query.plannedSharedFlag, req.query.sharePlanid, req.query.totalAmount, req.body.roommates);
    return res.send(result);
};

export const getBillByHome: RequestHandler = async (req, res) => {
    const result: IBill[] = await Azure.bill.getBillByHome(req.query.homeId);
    return res.send(result);
};

export const getBillByUser: RequestHandler = async (req, res) => {
    const result: IBill[] = await Azure.bill.getBillByUser(req.query.userId);
    return res.send(result);
};
