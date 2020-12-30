import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInstitutionService } from '@modules/user/institution/service/CreateInstitutionService';

export class InstitutionController {

    public async createInstitution(request: Request, response: Response): Promise<Response> {
        const { razaoSocial, typeCnpj, email, password } = request.body;

        const { cnpj } = typeCnpj;
        const createInstitutionService = container.resolve(CreateInstitutionService);
        await createInstitutionService.execute({ 
            razaoSocial, 
            cnpj, 
            email, 
            password
        });
        return response.json(200);
    }
};