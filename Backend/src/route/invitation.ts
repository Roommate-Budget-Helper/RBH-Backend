import express from 'express';
import * as controller from '../controller/invitation';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.getInvitation));
router.post('/', asyncMiddleware(controller.creatInvitation));
// router.delete('/', asyncMiddleware(controller.logout));

export default router;