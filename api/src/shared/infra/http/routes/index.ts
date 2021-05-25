import { Router } from 'express';

import { donatorRouter } from '@modules/user/donator/infra/http/routes/donator.route';
import { institutionRouter } from '@modules/user/institution/infra/http/routes/institution.route';

import { authRouter } from '@modules/user/bothUsers/infra/http/routes/Auth.route';
import { passwordRoutes } from '@modules/user/bothUsers/infra/http/routes/Password.route';
import { privateRoute } from '@modules/user/bothUsers/infra/http/routes/PrivateAccess.route';
import { profileRouter } from '@modules/user/bothUsers/infra/http/routes/AvatarProfile.route';
import { campaignRouter } from '@modules/campaing/infra/http/routes/campaign.route';
import { donationRouter } from '@modules/donation/infra/http/routes/donation.route';

export const routes = Router();

/*Donator routes here: */
routes.use('/donator', donatorRouter);

/*Institution routes here: */
routes.use('/institution', institutionRouter);

/*Institution routes here: */
routes.use('/campaign', campaignRouter);

/*Donation routes here*/
routes.use('/donation', donationRouter);

/*both users*/
routes.use('/auth', authRouter);
routes.use('/password', passwordRoutes);
routes.use('/access', privateRoute);
routes.use('/profile', profileRouter);
