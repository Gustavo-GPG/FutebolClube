import { expect } from 'chai';
import * as sinon from 'sinon';
import MatchesService from '../database/services/MatchesService';
import MatchesModel from '../database/models/MatchesModel';
import MatchesMock from './mocks/Matches.mock';
import SequelizeMatches from '../database/models/SequelizeMatchesModel';
import TeamsModel from '../database/models/TeamsModel';

describe('MatchesService', () => {
  let matchesService: MatchesService;
  let matchesModelStub: sinon.SinonStubbedInstance<MatchesModel>;
  let teamsModelStub: sinon.SinonStubbedInstance<TeamsModel>;

  beforeEach(() => {
    matchesModelStub = sinon.createStubInstance(MatchesModel);
    matchesService = new MatchesService(matchesModelStub);
    teamsModelStub = sinon.createStubInstance(TeamsModel);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testes de Matches', () => {
    it('Deve retornar todas as partidas', async () => {
      const matches = MatchesMock.mockMatches;
      matchesModelStub.findAll.resolves(matches as unknown as SequelizeMatches[]);

      const result = await matchesService.getAllMatches();

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(matches);
    });
  });

  describe('Deve retornar partidas em progresso', () => {
    it('Lista partidas que estão em progresso', async () => {
      const inProgress = true;
      const matches = MatchesMock.mockMatches;
      matchesModelStub.findByProgress.resolves(matches as unknown as SequelizeMatches[]);

      const result = await matchesService.getMatchesByProgress(inProgress);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(matches);
    });
  });
  describe('Finalizar partida', () => {
    it('Deve finalizar uma partida com sucesso', async () => {
      const matchId = 1;
      const mockFisinshMatch = MatchesMock.mockMatches[0];
      matchesModelStub.finishMatch.resolves(mockFisinshMatch as unknown as SequelizeMatches);

      const result = await matchesService.finishMatch(matchId);

      
      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal({ message: 'Finished' });
    });
  });
  
  describe('Atualizar partida', () => {
    it('Atualiza partida com sucesso', async () => {
      const matchId = 1;
      const matchData = { homeTeamGoals: 2, awayTeamGoals: 1 };
      const updatedMatch = { id: matchId, ...matchData };
      matchesModelStub.updateMatch.resolves(updatedMatch as unknown as SequelizeMatches);
  
      const result = await matchesService.updateMatch(matchId, matchData);
  
      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(updatedMatch);
    });
  });
  
  describe('Cria partida', () => {
    it('Deve criar uma partida com sucesso', async () => {
      const newMatch = { homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 };
      const createdMatch = { id: 1, ...newMatch };
      matchesModelStub.createMatch.resolves(createdMatch as unknown as SequelizeMatches);
  
      const result = await matchesService.createMatch(newMatch);
  
      expect(result.status).to.equal('CREATED');
      expect(result.data).to.deep.equal(createdMatch);
    });
  
    it('Retorna um erro se os ids forem iguais', async () => {
      const newMatch = { homeTeamId: 1, awayTeamId: 1, homeTeamGoals: 2, awayTeamGoals: 1 };
      matchesModelStub.createMatch.resolves(null);
      const result = await matchesService.createMatch(newMatch);
  
      expect(result.status).to.equal('UNPROCESSABLE');
      expect(result.data).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  
    it('Retorna NOT_FOUND caso não encontre o time', async () => {
      const newMatch = { homeTeamId: 0, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 };
      teamsModelStub.findById.onFirstCall().resolves(null);
      teamsModelStub.findById.onSecondCall().resolves({id: 2, teamName: 'XablauTeam'});
      matchesModelStub.createMatch.resolves(null);
  
      const result = await matchesService.createMatch(newMatch);

      expect(result.status).to.equal('NOT_FOUND');
      expect(result.data).to.deep.equal({ message: 'There is no team with such id!' });
    });
  });
});
