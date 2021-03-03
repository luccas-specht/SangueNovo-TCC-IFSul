import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/user/bothUsers/service/SendFogotPasswordEmailService';
import { ResetPasswordService } from '@modules/user/bothUsers/service/ResetPasswordService';

export class ForgotPasswordController {
  public async sendForgotPasswordEmail(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService
    );

    const linkToResetPassword = await sendForgotPasswordEmailService.execute({
      email,
    });

    return response.json({ linkToResetPassword });
  }

  public async resetPassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { password, token_id } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token_id,
    });

    return response.json().status(204);
  }
}
