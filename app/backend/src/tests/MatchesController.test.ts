import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
let token: string;
beforeEach(async () => {
  sinon.restore();
  const res = await chai.request(app)
  .post('/login')
  .send({ email: 'admin@admin.com', password: 'secret_admin' });
  token = res.body.token;
});

describe('Matches Controller Testes', function() {
  it('Quando não tiver uma query deve retornar todas as partidas', async function() {
    const matchesService = {
      getAllMatches: sinon.stub().resolves({ status: 'SUCCESSFUL', data: [] }),
    };
    const MatchesController = require('../database/controllers/MatchesController').default;
    const matchesController = new MatchesController(matchesService);
    const req = { query: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await matchesController.findMatchesByProgress(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith([])).to.be.true;
  });
  it('Quando tiver uma query inProgress deve retornar as partidas em andamento', async function() {
    const matchesService = {
      getMatchesByProgress: sinon.stub().resolves({ status: 'SUCCESSFUL', data: [] }),
    };
    const MatchesController = require('../database/controllers/MatchesController').default;
    const matchesController = new MatchesController(matchesService);
    const req = { query: { inProgress: 'true' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await matchesController.findMatchesByProgress(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith([])).to.be.true;
  });
  it('Deve ser possível finalizar uma partida', async function() {
    const matchesService = {
      finishMatch: sinon.stub().resolves({ status: 'SUCCESSFUL', data: { message: 'Finished' } }),
    };
    const MatchesController = require('../database/controllers/MatchesController').default;
    const matchesController = new MatchesController(matchesService);
    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await matchesController.finishMatch(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Finished' })).to.be.true;
  });
  it('Deve ser possível atualizar uma partida', async function() {
    const matchesService = {
      updateMatch: sinon.stub().resolves({ status: 'SUCCESSFUL', data: {} }),
    };
    const MatchesController = require('../database/controllers/MatchesController').default;
    const matchesController = new MatchesController(matchesService);
    const req = { params: { id: 1 }, body: { homeTeamGoals: 1, awayTeamGoals: 0 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await matchesController.updateMatch(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({})).to.be.true;
  });
  it('Deve ser possível criar uma partida', async function() {
    const matchesService = {
      createMatch: sinon.stub().resolves({ status: 'CREATED', data: {} }),
    };
    const MatchesController = require('../database/controllers/MatchesController').default;
    const matchesController = new MatchesController(matchesService);
    const req = { body: { homeTeamId: 1, awayTeamId: 2 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await matchesController.createMatch(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({})).to.be.true;
  });
  it('deve retornar uma lista de partidas ao chamar a rota GET /matches', (done) => {
    chai.request(app)
      .get('/matches')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});