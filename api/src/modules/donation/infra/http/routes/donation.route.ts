import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { DonationController } from '../../../controllers/DonationController';

export const donationRouter = Router();
const donationController = new DonationController();

donationRouter.use(ensureAuthenticated);

donationRouter.patch(
  '/appointment/update/status',
  donationController.updateAppointmentStatus
);
donationRouter.post('/appointment', donationController.createAppointment);
donationRouter.get(
  '/appointment/me',
  donationController.listAppointmentsByInstitutionId
);

donationRouter.put(
  '/donations/update/status',
  donationController.updateCompleteDonation
);
