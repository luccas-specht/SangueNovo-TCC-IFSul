import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';

import 'express-async-errors';

import { routes } from './routes';
import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/errors/appError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(
  (error: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('Server Started in port: 3333');
});
