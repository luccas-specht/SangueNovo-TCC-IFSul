import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { CampaignController } from '../../../controllers/CampaingController';

export const campaignRouter = Router();
const campaignController = new CampaignController();

campaignRouter.use(ensureAuthenticated);

campaignRouter.post('/', campaignController.createCampaign);
campaignRouter.get('/list/order', campaignController.orderCampaign);
campaignRouter.get('/list/:user_id', campaignController.listCampaign);
