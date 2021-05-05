import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateCampaingService } from '@modules/campaing/services/CreateCampaingService';

export class DonatorController {
  public async createDonator(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      title,
      typeBlood,
      dataAvaible,
      priority,
      avatar,
      idIntitution,
      description,
      id,
    } = request.body;

    const createCampaingService = container.resolve(CreateCampaingService);

    return response.json().status(200);
  }
}
