import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '@modules/user/donator/services/CreateDonatorService';

export class DonatorController {

    public async createDonator(request: Request, response: Response): Promise<Response> {
        const { name, typeCpf, birthday, email, password } = request.body;

        const { cpf } = typeCpf;
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