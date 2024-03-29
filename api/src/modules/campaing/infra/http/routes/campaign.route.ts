import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { CampaignController } from '../../../controllers/CampaingController';

export const campaignRouter = Router();
const campaignController = new CampaignController();

campaignRouter.use(ensureAuthenticated);

campaignRouter.post('/', campaignController.createCampaign);
campaignRouter.get('/list/order', campaignController.orderCampaign);
campaignRouter.get(
  '/list/status/:institution_id/:status',
  campaignController.listCampaignsByStatus
);
campaignRouter.get('/list/:user_id', campaignController.listCampaign);
campaignRouter.get('/:campaign_id', campaignController.findByCampaignId);
