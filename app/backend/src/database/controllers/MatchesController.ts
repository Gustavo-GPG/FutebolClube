import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private _matchService = new MatchesService()) {}

  async findMatchesByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this._matchService.getAllMatches();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    const serviceResponse = await this._matchService.getMatchesByProgress(inProgress === 'true');
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this._matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this._matchService.updateMatch(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    });
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async createMatch(req: Request, res: Response) {
    const serviceResponse = await this._matchService.createMatch(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
