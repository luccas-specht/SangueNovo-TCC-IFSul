import { Router } from 'express';

import { DonatorController } from '@modules/controllers/DonatorController';

export const donatorRouter = Router();

const donatorController = new DonatorController();

donatorRouter.post('/', donatorController.createDonator);
