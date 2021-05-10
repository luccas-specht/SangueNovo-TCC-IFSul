import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateCampaignService } from '@modules/campaing/services/CreateCampaignService';
import { ListCampaignsByUserIdService } from '@modules/campaing/services/ListCampaignsByUserIdService';

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
    const campaign = await createCampaignService.execute({
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
    return response.json(campaign).status(200);
  }

  public async listCampaign(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.body;

    const listCampaignsByUserIdService = container.resolve(
      ListCampaignsByUserIdService
    );
    const campaigns = await listCampaignsByUserIdService.execute({
      user_id,
    });
    return response.json(campaigns).status(200);
  }
}
