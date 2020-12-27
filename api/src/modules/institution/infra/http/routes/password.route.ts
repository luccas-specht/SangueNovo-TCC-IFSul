import { Router } from 'express';

import { ForgotPasswordController } from '../controllers/ForgotPasswordController';

export const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post('/forgot', forgotPasswordController.sendForgotPasswordEmail);
passwordRoutes.post('/reset', forgotPasswordController.resetPassword);