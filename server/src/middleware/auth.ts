// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { IUserAuthInfoRequest } from '../types/express';

interface JwtPayload {
  id: string;
  email: string;
}

export const auth = (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;  

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization is required'));
  }

  const token = authorization.replace('Bearer ', '');
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Authorization is required'));
  }
};
