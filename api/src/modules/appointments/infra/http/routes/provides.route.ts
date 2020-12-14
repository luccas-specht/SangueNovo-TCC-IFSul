import { Router } from 'express';

import { AppointmentsController } from '../controllers/appointmentsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticated';

const providersRouter = Router();
const appointmentsController = new AppointmentsController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', appointmentsController.listProviders);

export { providersRouter };
