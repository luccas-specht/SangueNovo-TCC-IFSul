import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

import { UpdateController } from '../../../controller/UpdateController';

export const profileRouter = Router();
const updateController = new UpdateController();

const upload = multer(uploadConfig);

profileRouter.use(ensureAuthenticated);

profileRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateController.updateAvatar
);
