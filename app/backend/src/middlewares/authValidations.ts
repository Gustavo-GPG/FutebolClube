import { NextFunction, Request, Response } from 'express';
import auth from '../utils/auth';
import UsersModel from '../database/models/UsersModel';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

const userModel = new UsersModel();

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = await auth.verify(token);
    const user = await userModel.findOneByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}

export default {
  validateToken,
};
