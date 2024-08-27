import { NewEntity } from '../../Interfaces/index';
import { IUsersModel } from '../../Interfaces/IUserModel';
import SequelizeUsers from './SequelizeUsersModel';
import IUsers from '../../Interfaces/IUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async create(data: NewEntity<IUsers>): Promise<IUsers> {
    const dbData = await this.model.create(data);

    const { id, username, role, email, password }:IUsers = dbData;
    return { id, username, role, email, password };
  }

  async findAll(): Promise<IUsers[]> {
    const dbData = await this.model.findAll();

    return dbData.map(
      ({ id, username, role, email, password }:IUsers) => ({ id, username, role, email, password }),
    );
  }

  async findById(id: IUsers['id']): Promise<IUsers | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { username, role, email, password }:IUsers = dbData;
    return { id, username, role, email, password };
  }

  async update(id: IUsers['id'], data: Partial<IUsers>): Promise<IUsers | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findById(id);
  }

  async delete(id: IUsers['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<IUsers | null > {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password }:IUsers = user;
    return { id, username, role, email, password };
  }
}
