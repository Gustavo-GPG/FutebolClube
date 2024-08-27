import { expect } from 'chai';
import * as sinon from 'sinon';
import UsersService from '../database/services/UsersService';
import UsersModel from '../database/models/UsersModel';

describe('UserService', () => {
  let userService: UsersService;
  let usersModelStub: sinon.SinonStubbedInstance<UsersModel>;

  beforeEach(() => {
    usersModelStub = sinon.createStubInstance(UsersModel);
    userService = new UsersService(usersModelStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('UserServiceLogin testes', () => {
    it('Deve retornar NOT_FOUND se o usuário não for encontrado', async () => {
      const email = 'test@example.com';
      usersModelStub.findOneByEmail.resolves(null);

      const result = await userService.loginService(email);

      expect(result.status).to.equal('NOT_FOUND');
      expect(result.data).to.deep.equal({ message: 'user not found' });
    });

    it('Deve retornar SUCCESSFUL com os dados do usuário se encontrado', async () => {
      const email = 'test@example.com';
      const userData = { id: 1, username: 'test', role: 'user', email: email, password: 'password' };
      usersModelStub.findOneByEmail.resolves(userData);

      const result = await userService.loginService(email);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(userData);
    });
  });

  describe('UserServiceGetUserByEmail testes', () => {
    it('Deve retornar NOT_FOUND se o usuário não for encontrado', async () => {
      const email = 'test@example.com';
      usersModelStub.findOneByEmail.resolves(null);

      const result = await userService.getUserbyEmail(email);

      expect(result.status).to.equal('NOT_FOUND');
    });

    it('Deve retornar SUCCESSFUL com o papel do usuário se encontrado', async () => {
      const email = 'test@example.com';
      const userRole = 'user';
      const userData = { id: 1, username: 'test', role: userRole, email: email, password: 'password' };
      usersModelStub.findOneByEmail.resolves(userData);

      const result = await userService.getUserbyEmail(email);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal({ role: userRole });
    });
  });
});
