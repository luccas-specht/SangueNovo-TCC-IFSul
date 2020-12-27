import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { messageInvalidToken, messageMissingToken} from '@modules/donator/constants/messageToUser';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError(messageMissingToken, 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();

  } catch {
    throw new AppError(messageInvalidToken, 401);
  }
};