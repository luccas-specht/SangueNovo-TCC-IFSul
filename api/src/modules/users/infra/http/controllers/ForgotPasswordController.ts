import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/users/services/SendFogotPasswordEmailService';
import { ResetPasswordService } from '@modules/users/services/ResetPassowrdService';

class ForgotPasswordController {
    public async sendForgotPasswordEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
  
        const sendForgotPasswordEmailService = container.resolve(
            SendForgotPasswordEmailService
        );
            
        await sendForgotPasswordEmailService.execute({
          email,
        });
    
        return response.status(204).json();
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
    
        return response.status(204).json();
    }
};

export { ForgotPasswordController };