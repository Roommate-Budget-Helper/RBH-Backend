import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createBill: RequestHandler = async (req, res) => {
    const result: boolean = await Azure.bill.createBill(
        req.body.ownerId,
        req.body.homeId,
        req.body.plannedSharedFlag,
        req.body.sharePlanid,
        req.body.full_name,
        req.body.totalAmount,
        req.body.roommates,
        req.body.amount,
        req.body.proportion,
        req.body.billName,
        req.body.descri,
        req.body.isRecurrent,
        req.body.isRecurrentDateTime,
        req.body.recurrentIntervl,
        req.body.created_at,
        req.body.created_by
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

export const getBillById: RequestHandler = async (req, res) => {
    const result: IBillDetail[] = await Azure.bill.getBillById(req.query.billId);

    return res.send(result);
};

export const deleteBill: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.deleteBill(req.query.billId);
    return res.send(result);
};

export const markAsResolved: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.markAsResolved(req.query.billId);
    return res.send(result);
};

export const getSharePlans: RequestHandler = async (req, res) => {
    const result: IBillSharePlan[] = await Azure.bill.getSharePlanValue(req.query.houseId);

    return res.send(result);
};

export const getRecurrentBill: RequestHandler = async (req, res) => {
    const result: IBillRecurrent[] = await Azure.bill.getRecurrentBill(req.query.houseId);

    return res.send(result);
};

export const editBillById: RequestHandler = async (req, res) => {
    // console.info(req.body);
    const result: Boolean = await Azure.bill.editBillById(req.body.bills);
    return res.send(result);
};
