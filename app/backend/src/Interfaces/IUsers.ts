export default interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export type IUsertNoPassword = Omit<IUsers, 'password'>;
