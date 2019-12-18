import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const createInvitation: RequestHandler = async (req, res) => {
    const result = await Azure.invitation.insertInvitationInfo(req.query.userId, req.query.houseId);
    return res.send(result);
};

export const getInvitation: RequestHandler = async (req, res) => {
    const result = await Azure.invitation.getInvitationInfo(req.query.userId);
    return res.send(result);
};
