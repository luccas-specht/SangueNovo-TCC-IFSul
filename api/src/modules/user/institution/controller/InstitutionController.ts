import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInstitutionService } from '../service/CreateInstitutionService';
import { ListInstitutionsService } from '../service/ListInstitutionsService';
import { UpdateInstitutionService } from '../service/UpdateInstitutionService';

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

  public async listInstituions(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listInstitutionsService = container.resolve(ListInstitutionsService);
    const list = await listInstitutionsService.execute();
    return response.json(list);
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
    return response
      .json({
        razao_social: institution.razao_social,
        cep: institution.cep,
        phone: institution.tb_user_fk.phone,
        avatar: institution.tb_user_fk.avatar,
      })
      .status(200);
  }
}
