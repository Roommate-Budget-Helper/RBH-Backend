import express from 'express';
import * as controller from '../controller/homes';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.getHome));
router.post('/', asyncMiddleware(controller.createHome));
router.get('/detail', asyncMiddleware(controller.getHomeDetail));
router.delete('/', asyncMiddleware(controller.removeRoommate));

export default router;
