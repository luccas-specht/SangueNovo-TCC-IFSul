import { Router } from 'express';

import { InstitutionController } from '@modules/user/institution/controller/InstitutionController';

export const institutionRouter = Router();

const institutionController = new InstitutionController();

institutionRouter.post('/', institutionController.createInstitution);
