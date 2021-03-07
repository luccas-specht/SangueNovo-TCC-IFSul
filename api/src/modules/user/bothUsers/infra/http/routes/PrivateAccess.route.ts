import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

import { PrivateAccess } from '../../../controller/PrivateAccess';

export const privateRoute = Router();
const privateAcess = new PrivateAccess();

privateRoute.get('/', ensureAuthenticated, privateAcess.createAcess);
