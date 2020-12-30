import { Router } from 'express';

import { donatorRouter } from '@modules/user/donator/infra/http/routes/donator.route';
import { institutionRouter } from "@modules/user/institution/infra/http/routes/institution.route";

import { authRouter } from '@modules/user/bothUsers/infra/http/routes/Auth.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */
routes.use('/institution', institutionRouter);

/*both users*/
routes.use('/auth', authRouter)