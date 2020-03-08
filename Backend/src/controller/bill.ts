import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createBill: RequestHandler = async (req, res) => {
    const result: numId = await Azure.bill.createBill(
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

    return res.send({ id: result } as IBillCreateResponse);
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
    const result: Boolean = await Azure.bill.editBillById(req.body);
    return res.send(result);
};

export const updateRecurrent: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.updateRecurrent(req.body.id, req.body.newDate);
    return res.send(result);
};

export const getProofById: RequestHandler = async (req, res) => {
    const result: FileList = await Azure.bill.getProofById(req.query.id);

    return res.send(result);
};

export const uploadProofById: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.uploadProofById(req.body.numId, req.body.billId, req.body.baseString);
    return res.send(result);
};

export const getBillHistoryById: RequestHandler = async (req, res) => {
    const result: IBillHistory[] = await Azure.bill.getBillHistoryById(req.query.billId);
    return res.send(result);
};

export const createBillHistory: RequestHandler = async (req, res) => {
    const result: Boolean = await Azure.bill.createBillHistory(
        {ownerId: req.body.ownerId,
        homeId: req.body.homeId,
        totalAmount: req.body.totalAmount,
        currentID: req.body.currentID,
        billName: req.body.billName,
        descri: req.body.descri,
        created_at: req.body.created_at,
        created_by: req.body.created_by});
    return res.send(result);
};
