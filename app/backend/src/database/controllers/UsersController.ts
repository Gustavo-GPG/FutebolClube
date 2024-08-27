import { Request, Response } from 'express';
import UserService from '../services/UsersService';
import auth from '../../utils/auth';
import mapStatusHTTP from '../../utils/mapStatusHTTP';

export default class UsersController {
  constructor(private _userService = new UserService()) {}

  public async loginController(req: Request, res: Response) {
    const { email, password } = req.body as unknown as { email: string; password: string };
    const token = auth.sign({ email, password });
    const serviceResponse = await this._userService.loginService(email);
    res.status(mapStatusHTTP(serviceResponse.status)).json({ token });
  }

  public async roleController(req: Request, res: Response) {
    const { authorization } = req.headers;
    const email = auth.decodedEmail(authorization as string);
    const serviceResponse = await this._userService.getUserbyEmail(email);
    res.status(mapStatusHTTP(serviceResponse.status)).json({ role: serviceResponse.data?.role });
  }
}
