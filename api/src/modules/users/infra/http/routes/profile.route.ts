import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticated';

import { UserController } from '../controllers/UserController'

const profileRouter = Router();
const userController = new UserController();

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', userController.updateProfile);
profileRouter.get('/', userController.showProfile);

export { profileRouter };
