import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import auth from '../utils/auth';
import UsersModel from '../database/models/UsersModel';
import validateToken from '../middlewares/authValidations';
import IUsers from '../Interfaces/IUsers';

chai.use(chaiHttp);

describe('ValidateToken middleware testes', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.spy();
  });
  beforeEach(function () { sinon.restore(); });
  it('Deve retornar 401 se não houver token de autorização', async () => {
    await validateToken.validateToken(req as Request, res as Response, next);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 401);
    sinon.assert.calledOnce(res.json as sinon.SinonStub);
    sinon.assert.calledWith(res.json as sinon.SinonStub, { message: 'Token not found' });
    sinon.assert.notCalled(next);
  });

  it('Deve retornar 401 se o token não for válido', async () => {
    req.headers!.authorization = 'Bearer tokenInválido';
    sinon.stub(auth, 'verify').throws(new Error('Invalid token'));

    await validateToken.validateToken(req as Request, res as Response, next);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 401);
    sinon.assert.calledOnce(res.json as sinon.SinonStub);
    sinon.assert.calledWith(res.json as sinon.SinonStub, { message: 'Token must be a valid token' });
    sinon.assert.notCalled(next);
  });

  it('Deve retornar 401 se o usuário não existir no banco de dados', async () => {
    req.headers!.authorization = 'Bearer tokenVálido';
    const tokenPayload = { email: 'user@example.com' };
    sinon.stub(auth, 'verify').returns(tokenPayload as any);
    sinon.stub(UsersModel.prototype, 'findOneByEmail').resolves(null);

    await validateToken.validateToken(req as Request, res as Response, next);

    sinon.assert.calledOnce(res.status as sinon.SinonStub);
    sinon.assert.calledWith(res.status as sinon.SinonStub, 401);
    sinon.assert.calledOnce(res.json as sinon.SinonStub);
    sinon.assert.calledWith(res.json as sinon.SinonStub, { message: 'Token must be a valid token' });
    sinon.assert.notCalled(next);
  });

  it('Deve chamar next() se o token for válido e o usuário existir no banco de dados', async () => {
    req.headers!.authorization = 'Bearer tokenVálido';
    const tokenPayload = { email: 'user@example.com' };
    sinon.stub(auth, 'verify').returns(tokenPayload as any);
    const existinUser: IUsers = {
      id: 1,
      username: 'user',
      role: 'admin',
      email: 'user@example.com',
      password: 'password'
    };
    sinon.stub(UsersModel.prototype, 'findOneByEmail').resolves(existinUser);

    await validateToken.validateToken(req as Request, res as Response, next);

    sinon.assert.notCalled(res.status as sinon.SinonStub);
    sinon.assert.notCalled(res.json as sinon.SinonStub);
    sinon.assert.calledOnce(next);
  });
});