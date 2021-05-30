import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { ListProviderAppointmentsService } from '../services/ListInstitutionAppointmentsService';
import { UpdateAppointmentStatusService } from '../services/UpdateAppointmentStatusService';
import { UpdateDonationService } from '../services/UpdateDonationService';

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

  public async updateAppointmentStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { donator_id, donation_id, donation_status } = request.body;

    const updateAppointmentStatusService = container.resolve(
      UpdateAppointmentStatusService
    );
    await updateAppointmentStatusService.execute({
      donator_id,
      donation_id,
      donation_status,
    });
    return response.json().status(200);
  }

  public async updateCompleteDonation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { donator_id, donation_id, donation_status } = request.body;

    const updateDonationService = container.resolve(UpdateDonationService);
    await updateDonationService.execute({
      donator_id,
      donation_id,
      donation_status,
    });
    return response.json().status(200);
  }
}
