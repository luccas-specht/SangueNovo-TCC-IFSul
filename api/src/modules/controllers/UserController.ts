import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '@modules/services/CreateDonatorService';

export class DonatorController {

    public async createDonator(request: Request, response: Response): Promise<Response> {
        const { name, cpf, birthday, email, password } = request.body;

        const createDonatorService = container.resolve(CreateDonatorService);
        const user = await createDonatorService.execute({ 
            name, 
            cpf, 
            birthday,
            email, 
            password
        });
        console.log(new Date())

        return response.json(user);
    }
};