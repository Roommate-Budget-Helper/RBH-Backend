import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';


export const createBill: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.createBill(req.query.ownerId, req.query.homeId, req.query.internalFlag,
        req.query.plannedSharedFlag,req.query.sharePlanid,req.query.proportion,req.query.totalAmount).then((result) => {
        return result;
    });
    return res.send(result);
};

export const getBillByHome: RequestHandler = async (req, res) => {
    const result:IBill[]= await Azure.bill.getBillByHome(req.query.homeId);
    return res.send(result);
};

export const getBillByUser: RequestHandler = async (req, res) => {
    const result:IBill[] = await Azure.bill.getBillByUser(req.query.userId);
    return res.send(result);
};

