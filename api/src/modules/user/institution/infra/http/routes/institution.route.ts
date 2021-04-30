import { Router } from 'express';

import { ensureDataRequest } from '../schemas/Instituon.schema';
import { InstitutionController } from '@modules/user/institution/controller/InstitutionController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

export const institutionRouter = Router();

const institutionController = new InstitutionController();

institutionRouter.post(
  '/',
  ensureDataRequest,
  institutionController.createInstitution
);

institutionRouter.get(
  '/list',
  ensureAuthenticated,
  institutionController.listInstituions
);
