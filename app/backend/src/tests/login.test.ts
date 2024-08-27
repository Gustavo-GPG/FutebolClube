import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import LoginMock from './mocks/Login.mock';
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import auth from '../utils/auth';
import UserService from '../database/services/UsersService';
import UsersController from '../database/controllers/UsersController';
import mapStatusHTTP from '../utils/mapStatusHTTP';

chai.use(chaiHttp);

const { expect } = chai;
const usersModel = new UsersModel();

describe('Login testes', function() {
  beforeEach(function () { sinon.restore(); });
  it('Ao não receber um email retorna uma mensagem de erro', async function () {
    const httpRequestBody = LoginMock.noEmailLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })
  it('Ao não receber uma senha retorna uma mensagem de erro', async function () {
    const httpRequestBody = LoginMock.noPasswordLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })
  it('Ao não encontrar um usuário retorna uma mensagem de erro', async function () {
    const httpRequestBody = LoginMock.notExistingUserBody;
    sinon.stub(usersModel, 'findOneByEmail').resolves(null)
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  it('Ao encontrar um usuário mas com senha errada retorna uma mensagem de erro', async function () {
    const httpRequestBody = LoginMock.existingUserWithWrongPasswordBody;
    sinon.stub(usersModel, 'findOneByEmail').resolves(LoginMock.existinUser)
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })
  it('Ao encontrar um usuário e senha correta retorna um token', async function () {
    const httpRequestBody = LoginMock.validLoginBody;
    sinon.stub(usersModel, 'findOneByEmail').resolves(LoginMock.existinUser)
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.have.property('token');
  })
  it('Ao receber um token válido deve retornar o papel do usuário', async function () {
    const email = 'test@example.com';
    const role = 'admin';
    const token = 'tokenVálido';

    const req: any = {
      headers: { authorization: `Bearer ${token}` }
    };
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(auth, 'decodedEmail').returns(email);
    sinon.stub(UserService.prototype, 'getUserbyEmail').resolves({ status: 'SUCCESSFUL', data: { role } });
    const usersController = new UsersController();
    await usersController.roleController(req, res);

    sinon.assert.calledWith(res.status, mapStatusHTTP('SUCCESSFUL'));
    sinon.assert.calledWith(res.json, { role });
  })
})