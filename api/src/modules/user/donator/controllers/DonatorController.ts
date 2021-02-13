import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '@modules/user/donator/services/CreateDonatorService';

export class DonatorController {

    public async createDonator(request: Request, response: Response): Promise<Response> {
        const { name, cpf, birthday, email, phone, password } = request.body;

        const createDonatorService = container.resolve(CreateDonatorService);
         await createDonatorService.execute({ 
            name, 
            cpf, 
            birthday,
            email, 
            password,
            phone
        });
        return response.json().status(200);
    }
};