import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamService = new TeamsService()) {}

  public async getAllTeams(_req:Request, res:Response) {
    const ServiceReponse = await this._teamService.getAllTeams();
    res.status(mapStatusHTTP(ServiceReponse.status)).json(ServiceReponse.data);
  }

  public async getTeamById(req:Request, res:Response) {
    const { id } = req.params;
    const serviceResponse = await this._teamService.getTeamById(Number(id));
    if (serviceResponse.status === 'SUCCESSFUL') {
      res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
