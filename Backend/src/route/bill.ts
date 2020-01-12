import express from 'express';
import * as controller from '../controller/bill';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/byhome', asyncMiddleware(controller.getBillByHome));
router.post('/', asyncMiddleware(controller.createBill));
router.get('/byuser', asyncMiddleware(controller.getBillByUser));

export default router;
