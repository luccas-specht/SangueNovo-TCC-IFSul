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
      description,
      dataAvaible,
      typeBlood,
      priority,
      id_user,
      id_intitution,
    } = request.body;
    const avatarFileName = request.file.filename;

    const createCampaingService = container.resolve(CreateCampaingService);

    return response.json().status(200);
  }
}
