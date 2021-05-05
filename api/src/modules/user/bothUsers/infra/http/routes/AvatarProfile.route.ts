import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

import { UserController } from '../../../controller/UpdateController';

export const profileRouter = Router();
const userController = new UserController();

profileRouter.use(ensureAuthenticated);

profileRouter.patch('/', userController.updateAvatar);
