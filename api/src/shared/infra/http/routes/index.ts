import { Router } from 'express';

import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.route';
import { providersRouter } from '@modules/appointments/infra/http/routes/provides.route';
import { userRouter } from '@modules/users/infra/http/routes/users.route';
import { authRouter } from '@modules/users/infra/http/routes/auth.route';
import { passwordRoutes } from '@modules/users/infra/http/routes/password.route';
import { profileRouter } from '@modules/users/infra/http/routes/profile.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter)

export { routes };
