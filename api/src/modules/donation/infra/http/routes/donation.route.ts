import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { DonationController } from '../../../controllers/DonationController';

export const donationRouter = Router();
const donationController = new DonationController();

donationRouter.use(ensureAuthenticated);

donationRouter.post('/appointment', donationController.createAppointment);
