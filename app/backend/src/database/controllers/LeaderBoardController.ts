import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  async getLeaderboardHome(_req: Request, res: Response) {
    const serviceResponse = await this._leaderboardService.getHomeTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const serviceResponse = await this._leaderboardService.getHomeAway();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getOverallLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this._leaderboardService.getOverallLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
