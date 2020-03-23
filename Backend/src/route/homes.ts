import express from 'express';
import * as controller from '../controller/homes';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.getHome));
router.get('/balance', asyncMiddleware(controller.getUserbalanceByHome));
router.get('/detail', asyncMiddleware(controller.getHomeDetail));
router.post('/', asyncMiddleware(controller.createHome));
router.delete('/', asyncMiddleware(controller.removeRoommate));

export default router;
