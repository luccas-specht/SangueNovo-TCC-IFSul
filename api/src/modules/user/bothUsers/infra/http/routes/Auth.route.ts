import { Router } from 'express';

import { AuthController } from '../../../controller/AuthController';
import { ensureDataRequest } from '../schemas/Auth.schema';

export const authRouter = Router();
const authController = new AuthController();

authRouter.use(ensureDataRequest);

authRouter.post('/', authController.createAuth);
