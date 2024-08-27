import { NextFunction, Request, Response } from 'express';
import bcrypt = require('bcryptjs');
import UsersModel from '../database/models/UsersModel';

function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
}

const userModel = new UsersModel();
const message = 'Invalid email or password';

async function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user = await userModel.findOneByEmail(email);
  if (!emailRegex.test(email) || user?.email !== email) {
    return res.status(401).json({ message });
  }
  next();
}

async function validatePassword(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await userModel.findOneByEmail(email);
  if (!user || password.length < 6) {
    return res.status(401).json({ message });
  }
  const samePassword = await bcrypt.compare(password, user?.password);
  if (!samePassword) {
    return res.status(401).json({ message });
  }
  next();
}

export default {
  validateLoginBody,
  validateEmail,
  validatePassword,
};
