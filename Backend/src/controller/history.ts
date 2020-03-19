import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const getHistory: RequestHandler = async (req, res) => {
    const result = await Azure.history.getHistory(req.query.userId);
    return res.send(result);
};