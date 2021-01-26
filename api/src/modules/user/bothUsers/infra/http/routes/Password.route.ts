import { Router } from 'express';

import { ensureForgotRequest, ensureResetRequest } from '../schemas/Password.route';
import { ForgotPasswordController } from '../../../controller/ForgotPasswordController';

export const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post('/forgot', 
    ensureForgotRequest,
    forgotPasswordController.sendForgotPasswordEmail 
);

passwordRoutes.post('/reset', 
    ensureResetRequest,   
    forgotPasswordController.resetPassword  
);