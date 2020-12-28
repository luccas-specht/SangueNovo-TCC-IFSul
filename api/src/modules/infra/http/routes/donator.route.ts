import { Router } from 'express';

import { DonatorController } from '../../../controllers/UserController'

export const donatorRouter = Router();

const donatorController = new DonatorController();

donatorRouter.post('/', donatorController.createDonator);
