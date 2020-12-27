import { Router } from 'express';

import { donatorRouter } from '@modules/infra/http/routes/users.route';
import { authRouter } from '@modules/infra/http/routes/auth.route';
import { profileRouter } from '@modules/infra/http/routes/profile.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */

/*both users*/
routes.use('/profile', profileRouter);
routes.use('/auth', authRouter);
