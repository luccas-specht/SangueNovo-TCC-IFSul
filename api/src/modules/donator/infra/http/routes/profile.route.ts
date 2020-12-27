import { Router } from 'express';

import { ensureAuthenticated } from '@modules/donator/infra/http/middleware/ensureAuthenticated';

import { DonatorController } from '../controllers/UserController'

export const profileRouter = Router();

const donatorController = new DonatorController();

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', donatorController.updateProfile);
profileRouter.get('/', donatorController.showProfile);