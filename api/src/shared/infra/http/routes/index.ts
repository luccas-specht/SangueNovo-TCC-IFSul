import { Router } from 'express';

import { donatorRouter } from '@modules/user/donator/infra/http/routes/donator.route';
import { institutionRouter } from '@modules/user/institution/infra/http/routes/institution.route';

import { authRouter } from '@modules/user/bothUsers/infra/http/routes/Auth.route';
import { passwordRoutes } from '@modules/user/bothUsers/infra/http/routes/Password.route';
import { privateRoute } from '@modules/user/bothUsers/infra/http/routes/PrivateAccess.route';
import { profileRouter } from '@modules/user/bothUsers/infra/http/routes/AvatarProfile.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */
routes.use('/institution', institutionRouter);

/*both users*/
routes.use('/auth', authRouter);
routes.use('/password', passwordRoutes);
routes.use('/access', privateRoute);
routes.use('/profile', profileRouter);
