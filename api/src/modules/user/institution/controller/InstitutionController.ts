import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInstitutionService } from '@modules/user/institution/service/CreateInstitutionService';

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
}
