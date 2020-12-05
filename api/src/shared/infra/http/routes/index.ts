import { Router } from 'express';

import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.route';
import { userRouter } from '@modules/users/infra/http/routes/users.route';
import { authRouter } from '@modules/users/infra/http/routes/auth.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/auth', authRouter);

export { routes };
