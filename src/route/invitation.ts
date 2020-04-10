import express from 'express';
import * as controller from '../controller/invitation';

import { asyncMiddleware } from '../../lib/middleware/async';

const router = express.Router();

router.get('/', asyncMiddleware(controller.getInvitation));
router.post('/', asyncMiddleware(controller.createInvitation));
router.delete('/accept', asyncMiddleware(controller.acceptInvitation));
router.delete('/decline', asyncMiddleware(controller.declineInvitation));
router.get('/allusers', asyncMiddleware(controller.getAllUsers));
router.get('/checkinvitation', asyncMiddleware(controller.checkInvitation));
export default router;
