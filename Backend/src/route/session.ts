import express from 'express';
import * as controller from '../controller/session';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.login));
router.post('/', asyncMiddleware(controller.register));
router.delete('/', asyncMiddleware(controller.logout));

export default router;
