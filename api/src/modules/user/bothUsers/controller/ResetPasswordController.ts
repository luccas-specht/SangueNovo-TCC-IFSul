import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/user/bothUsers/service/SendForgotPasswordEmailService';
import { ResetPasswordService } from '@modules/user/bothUsers/service/ResetPasswordSercive';

export class ResetPasswordController {
    public async sendForgotPasswordEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
  
        const sendForgotPasswordEmailService = container.resolve(
            SendForgotPasswordEmailService
        );
            
        await sendForgotPasswordEmailService.execute({ email });
    
        return response.status(204).json();
    }
    
    public async resetPassword(request: Request, response: Response): Promise<Response> {
        const { password, tokenId } = request.body;
  
        const resetPassword = container.resolve(ResetPasswordService);
            
        await resetPassword.execute({
          password, 
          tokenId
        });
    
        return response.status(204).json();
    }
};