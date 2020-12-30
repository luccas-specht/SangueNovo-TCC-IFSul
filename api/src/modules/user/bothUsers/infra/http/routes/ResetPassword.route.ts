import { Router } from 'express';

import { ResetPasswordController } from '@modules/user/bothUsers/controller/ResetPasswordController';

export const resetPasswordRoute = Router();
const resetPasswordController = new ResetPasswordController();

resetPasswordRoute.post('/forgot', resetPasswordController.sendForgotPasswordEmail);
resetPasswordRoute.post('/reset', resetPasswordController.resetPassword);