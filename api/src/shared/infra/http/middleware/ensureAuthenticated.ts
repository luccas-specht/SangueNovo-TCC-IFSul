import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from 'constants/messageToUser';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError(MESSAGEINVALID.missingToken, 401);

  const [, token] = authHeader.split(' ');
  console.log('token', token);

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError(MESSAGEINVALID.invalidToken, 401);
  }
}
