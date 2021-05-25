import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '../services/CreateAppointmentService';

export class DonationController {
  public async createAppointment(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { appointment, donatorId, campaignId } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );
    await createAppointmentService.execute({
      appointment,
      donatorId,
      campaignId,
    });
    return response.json().status(200);
  }
}
