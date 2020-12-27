import { Router } from 'express';

import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

export const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.sendForgotPasswordEmail);
passwordRouter.post('/reset', forgotPasswordController.resetPassword);