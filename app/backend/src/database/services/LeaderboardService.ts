import LeaderBoardModel from '../models/LeaderBoardModel';

export default class LeaderboardService {
  constructor(private _leaderBoardModel = new LeaderBoardModel()) {}

  public async getHomeTeams() {
    const leaderBoardHome = await this._leaderBoardModel.leaderBoardSort(true);
    return { status: 'SUCCESSFUL', data: leaderBoardHome };
  }

  public async getHomeAway() {
    const leaderBoardAway = await this._leaderBoardModel.leaderBoardSort(false);
    return { status: 'SUCCESSFUL', data: leaderBoardAway };
  }

  public async getOverallLeaderboard() {
    const leaderBoard = await this._leaderBoardModel.getOverallLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}
