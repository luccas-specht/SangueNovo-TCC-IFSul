import { Router } from 'express';

import { donatorRouter } from '@modules/infra/http/routes/donator.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */

/*both users*/