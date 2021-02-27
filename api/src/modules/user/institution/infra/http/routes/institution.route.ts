import { Router } from 'express';

import { ensureDataRequest } from '../schemas/Instituon.schema';
import { InstitutionController } from '@modules/user/institution/controller/InstitutionController';

export const institutionRouter = Router();

const institutionController = new InstitutionController();

institutionRouter.post(
  '/',
  ensureDataRequest,
  institutionController.createInstitution
);
