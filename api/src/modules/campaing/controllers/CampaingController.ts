import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateCampaignService } from '@modules/campaing/services/CreateCampaignService';
import { ListCampaignsByUserIdService } from '@modules/campaing/services/ListCampaignsByUserIdService';
import { OrderCampaignsService } from '../services/OrderCampaignsService';
import { FindByCampaignIdService } from '../services/FindByCampaignIdService';

export class CampaignController {
  public async createCampaign(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      title,
      description,
      availableDate,
      goal,
      typeBlood,
      priority,
      user_id,
      institution_id,
    } = request.body;
    // const avatar = request.file.filename;

    const createCampaignService = container.resolve(CreateCampaignService);
    await createCampaignService.execute({
      title,
      description,
      availableDate,
      goal,
      typeBlood,
      priority,
      user_id,
      institution_id,
      // avatar,
    });
    return response.json().status(200);
  }

  public async listCampaign(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params;

    const listCampaignsByUserIdService = container.resolve(
      ListCampaignsByUserIdService
    );
    const campaigns = await listCampaignsByUserIdService.execute({
      user_id,
    });
    return response.json(campaigns).status(200);
  }

  public async orderCampaign(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { bloodTypes, institutionId, priorities, title } = request.body;

    const orderCampaignsService = container.resolve(OrderCampaignsService);
    const campaigns = await orderCampaignsService.execute({
      title,
      institutionId,
      priorities,
      bloodTypes,
    });
    return response.json(campaigns).status(200);
  }

  public async findByCampaignId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { campaign_id } = request.params;
    console.log('para', campaign_id);

    const findCampaignsByIdServide = container.resolve(FindByCampaignIdService);
    const campaigns = await findCampaignsByIdServide.execute({
      campaign_id,
    });
    return response.json(campaigns).status(200);
  }
}
