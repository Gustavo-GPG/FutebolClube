import { ServiceResponse, GetUserByEmailResponse } from '../../Interfaces/ServiceReponse';
import { IUsersModel } from '../../Interfaces/IUserModel';
import UsersModel from '../models/UsersModel';
import IUsers, { IUsertNoPassword } from '../../Interfaces/IUsers';

export default class UserService {
  constructor(private _userModel: IUsersModel = new UsersModel()) {}

  public async loginService(
    email: string,
  ): Promise<ServiceResponse<IUsers | IUsertNoPassword>> {
    const user = await this._userModel.findOneByEmail(email);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'user not found' } };
    return { status: 'SUCCESSFUL', data: user };
  }

  public async createUserService(data: IUsers): Promise<ServiceResponse<IUsers>> {
    const user = await this._userModel.create(data);
    return { status: 'CREATED', data: user };
  }

  public async getUserbyEmail(email: string): Promise<GetUserByEmailResponse> {
    const user = await this._userModel.findOneByEmail(email);
    if (!user) return { status: 'NOT_FOUND' };
    const { role } = user;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
