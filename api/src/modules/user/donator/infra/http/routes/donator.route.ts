import { Router } from 'express';

import { ensureDataRequest } from '../schemas/createDonator.schema';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { DonatorController } from '@modules/user/donator/controllers/DonatorController';

export const donatorRouter = Router();

const donatorController = new DonatorController();

donatorRouter.post('/', ensureDataRequest, donatorController.createDonator);

donatorRouter.put(
  '/profile',
  ensureAuthenticated,
  donatorController.updateDonator
);
