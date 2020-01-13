import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createBill: RequestHandler = async (req, res) => {
    const result: boolean = await Azure.bill.createBill(
        req.body.ownerId,
        req.body.homeId,
        req.body.plannedSharedFlag,
        req.body.sharePlanid,
        req.body.totalAmount,
        req.body.roommates,
        req.body.amount,
        req.body.proportion
    );

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
