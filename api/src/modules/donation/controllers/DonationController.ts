import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { ListProviderAppointmentsService } from '../services/ListInstitutionAppointmentsService';

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

  public async listAppointmentsByInstitutionId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { institution_id, day, month, year, status } = request.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    await listProviderAppointmentsService.execute({
      institution_id: String(institution_id),
      day: Number(day),
      month: Number(month),
      year: Number(year),
      status: String(status),
    });
    return response.json().status(200);
  }
}
