import { RequestHandler } from 'express';
import * as Azure from '../../lib/driver/azure/index';

export const getHistory: RequestHandler = async (req, res) => {
    const result: IHistoryResponse[] = await Azure.history.getHistory(req.query.userId as any);
    return res.send(result);
};
