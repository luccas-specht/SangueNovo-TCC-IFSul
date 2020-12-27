import { Router } from 'express';

import { donatorRouter } from '@modules/donator/infra/http/routes/users.route';
import { authRouter } from '@modules/donator/infra/http/routes/auth.route';
import { passwordRouter } from '@modules/donator/infra/http/routes/password.route';
import { profileRouter } from '@modules/donator/infra/http/routes/profile.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */

/*both users*/
routes.use('/profile', profileRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
