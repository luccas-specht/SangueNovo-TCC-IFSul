import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { ListProviderAppointmentsService } from '../services/ListInstitutionAppointmentsService';

export class DonationController {
  public async createAppointment(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { appointment, donatorId, campaignId, institutionId } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );
    await createAppointmentService.execute({
      appointment,
      donatorId,
      campaignId,
      institutionId,
    });
    return response.json().status(200);
  }

  public async listAppointmentsByInstitutionId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { day, month, year, status } = request.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const list = await listProviderAppointmentsService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      status: String(status),
    });
    return response.json(list).status(200);
  }
}
