import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '@modules/services/CreateDonatorService';

export class DonatorController {

    public async createDonator(request: Request, response: Response): Promise<Response> {
        const { name, type_cpf, birthday, email, password } = request.body;
        console.log('oq chegou', request.body)

        const { cpf } = type_cpf;
        const createDonatorService = container.resolve(CreateDonatorService);
        await createDonatorService.execute({ 
            name, 
            cpf, 
            birthday,
            email, 
            password
        });
        return response.json(200);
    }
};