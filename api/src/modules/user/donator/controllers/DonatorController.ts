import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '../services/CreateDonatorService';
import { UpdateDonatorService } from '../services/UpdateDonatorService';

export class DonatorController {
  public async createDonator(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, phone, password } = request.body;

    const createDonatorService = container.resolve(CreateDonatorService);
    await createDonatorService.execute({
      name,
      phone,
      email,
      password,
    });
    return response.json().status(200);
  }

  public async updateDonator(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, phone, password, userId } = request.body;

    const updateDonatorService = container.resolve(UpdateDonatorService);
    const donator = await updateDonatorService.execute({
      name,
      phone,
      password,
      userId,
    });
    return response
      .json({
        name: donator.name,
        phone: donator.tb_user_fk.phone,
        avatar: donator.tb_user_fk.avatar,
      })
      .status(200);
  }
}
