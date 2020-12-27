import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationService } from '@modules/services/AuthenticationDonatorServer';

export class AuthController {
    public async createAuth(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
  
        const authenticationService = container.resolve(AuthenticationService);
            
        const { donator, token } = await authenticationService.execute({
          email,
          password,
        });
    
        return response.json({ donator, token });
    }
};