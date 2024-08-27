import IUsers, { IUsertNoPassword } from './IUsers';

export interface IUsersModel {
  create(data: Partial<IUsers>): Promise<IUsers>
  findAll(): Promise<IUsers[]>
  findById(id: IUsers['id']): Promise<IUsers | null>
  update(id: IUsers['id'], data: Partial<IUsers>): Promise<IUsers | null>
  delete(id: IUsers['id']): Promise<number>
  findOneByEmail(email: IUsers['email']): Promise<IUsers | null | IUsertNoPassword>
}
