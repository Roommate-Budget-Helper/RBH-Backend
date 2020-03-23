import express from 'express';
import * as controller from '../controller/history';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.getHistory));

export default router;
