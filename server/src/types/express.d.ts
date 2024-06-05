import { JwtPayload } from 'jsonwebtoken';

export declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
