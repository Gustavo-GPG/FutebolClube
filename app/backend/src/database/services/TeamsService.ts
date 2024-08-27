import { ServiceResponse } from '../../Interfaces/ServiceReponse';
import ITeams from '../../Interfaces/ITeams';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';

export default class TeamsService {
  constructor(private _teamsModel: ITeamsModel = new TeamsModel()) {}

  public async getAllTeams():Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this._teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number):Promise<ServiceResponse<ITeams>> {
    const team = await this._teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
