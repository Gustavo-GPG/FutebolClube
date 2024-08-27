import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeamsModel';
import { team, teams } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Testes', function() {
  beforeEach(function() { sinon.restore();});
  it('Deve listar todos os times', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const {status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });
  it('Deve listar um único time', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);
    const {status, body} = await chai.request(app).get('/teams/1')
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });
})