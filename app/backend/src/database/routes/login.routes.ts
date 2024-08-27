import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import validateLogin from '../../middlewares/loginValidations';
import authValidations from '../../middlewares/authValidations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next) => validateLogin.validateLoginBody(req, res, next),
  (req: Request, res: Response, next) => validateLogin.validateEmail(req, res, next),
  (req: Request, res: Response, next) => validateLogin.validatePassword(req, res, next),
  (req: Request, res: Response) => usersController.loginController(req, res),
);

router.get(
  '/role',
  (req: Request, res: Response, next) => authValidations.validateToken(req, res, next),
  (req: Request, res: Response) => usersController.roleController(req, res),
);

export default router;
