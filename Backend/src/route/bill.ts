import express from 'express';
import * as controller from '../controller/bill';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/byhome', asyncMiddleware(controller.getBillByHome));
router.get('/byuser', asyncMiddleware(controller.getBillByUser));
router.get('/byid', asyncMiddleware(controller.getBillById));
router.post('/byid', asyncMiddleware(controller.editBillById));
router.get('/shareplan', asyncMiddleware(controller.getSharePlans));
router.get('/recurrentbill', asyncMiddleware(controller.getRecurrentBill));
router.post('/', asyncMiddleware(controller.createBill));
router.delete('', asyncMiddleware(controller.deleteBill));
router.put('', asyncMiddleware(controller.markAsResolved));

export default router;
