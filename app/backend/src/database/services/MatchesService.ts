import { ServiceResponse } from '../../Interfaces/ServiceReponse';
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../../Interfaces/IMatchesModel';
import IMatches from '../../Interfaces/IMatches';
import IMatchesUpdate from '../../Interfaces/IMatchesUpdate';
import { INewMatches } from '../../Interfaces/INewMatches';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';
import TeamsModel from '../models/TeamsModel';
import SequelizeMatches from '../models/SequelizeMatchesModel';
import MatchReturn from '../../Interfaces/IMatchesReturn';

export default class MatchesService {
  constructor(
    private _matchesModel: IMatchesModel = new MatchesModel(),
    private _teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllMatches() {
    const matches = await this._matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getMatchesByProgress(
    inProgress: boolean,
  ): Promise<ServiceResponse<SequelizeMatches[] | MatchReturn[]>> {
    const matches = await this._matchesModel.findByProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(matchId: IMatches['id']) {
    await this._matchesModel.finishMatch(matchId);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(matchId: IMatches['id'], matchData: IMatchesUpdate) {
    const match = await this._matchesModel.updateMatch(matchId, matchData);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async createMatch(newMatch: INewMatches) {
    const { homeTeamId, awayTeamId } = newMatch;
    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this._teamsModel.findById(homeTeamId);
    const awayTeam = await this._teamsModel.findById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    const match = await this._matchesModel.createMatch(newMatch);
    return { status: 'CREATED', data: match };
  }
}
