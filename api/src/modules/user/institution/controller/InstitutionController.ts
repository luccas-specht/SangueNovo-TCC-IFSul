import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInstitutionService } from '@modules/user/institution/service/CreateInstitutionService';
import { ListInstitutionsService } from '@modules/user/institution/service/ListInstitutionsService';

export class InstitutionController {
  public async createInstitution(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { razaoSocial, cnpj, email, phone, password, cep } = request.body;

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
}
