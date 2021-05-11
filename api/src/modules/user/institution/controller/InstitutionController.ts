import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInstitutionService } from '../service/CreateInstitutionService';
import { UpdateInstitutionService } from '../service/UpdateInstitutionService';
import { UpdateRequestedCampaignService } from '../service/UpdateRequestedCampaign';
import { ListInstitutionsService } from '../service/ListInstitutionsService';
import { ListRequestedCampaignsService } from '../service/ListRequestedCampaignsService';

export class InstitutionController {
  public async createInstitution(
    request: Request,
    response: Response
  ): Promise<Response> {
    const {
      razaoSocial,
      cnpj,
      email,
      phone,
      password,
      cep,
      latitude,
      longitude,
    } = request.body;
    const createInstitutionService = container.resolve(
      CreateInstitutionService
    );
    await createInstitutionService.execute({
      razaoSocial,
      cnpj,
      email,
      phone,
      password,
      cep,
      latitude,
      longitude,
    });
    return response.json().status(200);
  }

  public async updateInstitution(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { razaoSocial, phone, password, cep, userId } = request.body;
    const updateInstitutionService = container.resolve(
      UpdateInstitutionService
    );
    const institution = await updateInstitutionService.execute({
      razaoSocial,
      phone,
      password,
      cep,
      userId,
    });
    return response.json(institution);
  }

  public async updateRequestCampaign(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { campaign_id, new_status } = request.body;
    const updateRequestedCampaignService = container.resolve(
      UpdateRequestedCampaignService
    );
    await updateRequestedCampaignService.execute({
      campaign_id,
      new_status,
    });
    return response.json().status(200);
  }

  public async listInstituions(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listInstitutionsService = container.resolve(ListInstitutionsService);
    const list = await listInstitutionsService.execute();
    return response.json(list);
  }

  public async listRequestedCampaigns(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { institution_id } = request.body;
    const listRequestedCampaignsService = container.resolve(
      ListRequestedCampaignsService
    );
    const list = await listRequestedCampaignsService.execute({
      institution_id,
    });
    return response.json(list);
  }
}
