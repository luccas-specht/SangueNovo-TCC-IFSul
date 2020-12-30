import { Router } from 'express';

import { AuthController } from '../../../controller/AuthController';

export const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authController.createAuth);