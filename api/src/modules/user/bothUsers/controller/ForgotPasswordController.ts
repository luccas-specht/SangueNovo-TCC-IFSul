import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/user/bothUsers/service/SendFogotPasswordEmailService';
import { ResetPasswordService } from '@modules/user/bothUsers/service/ResetPassowrdService';

export class ForgotPasswordController {
    public async sendForgotPasswordEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmailService = container.resolve(
            SendForgotPasswordEmailService
        );
            
        await sendForgotPasswordEmailService.execute({ email });
    
        return response.json().status(204)
    }

    public async resetPassword(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;
  
        const resetPassword = container.resolve(
            ResetPasswordService
        );
            
        await resetPassword.execute({
          password, 
          token
        });
    
        return response.json().status(204)
    }
};