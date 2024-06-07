import { JwtPayload } from 'jsonwebtoken';
import { Request } from "express"

export interface IUserAuthInfoRequest extends Request {
  user?: JwtPayload 
}