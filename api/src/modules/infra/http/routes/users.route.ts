import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/infra/http/middleware/ensureAuthenticated';

import { DonatorController } from '../controllers/UserController'

export const donatorRouter = Router();

const donatorController = new DonatorController();

const upload = multer(uploadConfig);

donatorRouter.post('/', donatorController.createDonator);
donatorRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), donatorController.updateAvatar);
