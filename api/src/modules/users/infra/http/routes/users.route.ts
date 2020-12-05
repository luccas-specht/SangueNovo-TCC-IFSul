import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticated';

import { UserController } from '../controllers/UserController'

const userRouter = Router();
const userController = new UserController();

const upload = multer(uploadConfig);

userRouter.post('/', userController.createUser);

userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userController.updateAvatar);

export { userRouter };
