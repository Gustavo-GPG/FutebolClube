import { MatchTeamsNames } from '../../Interfaces/IMatches';
import { ILeaderboard } from '../../Interfaces/ILeaderboard';
import MatchesModel from './MatchesModel';
import TeamsModel from './TeamsModel';

export default class LeaderBoardModel extends MatchesModel {
  static teamsModel = new TeamsModel();

  static draw(matches: MatchTeamsNames[], teamId: number, isHome: boolean): number {
    if (isHome) {
      const draws = matches
        .filter((match) => match.homeTeamId === teamId
        && match.homeTeamGoals === match.awayTeamGoals).length;
      return draws;
    }
    const draws = matches
      .filter((match) => match.awayTeamId === teamId
      && match.homeTeamGoals === match.awayTeamGoals).length;
    return draws;
  }

  static victory(matches: MatchTeamsNames[], teamId: number, isHome: boolean): number {
    if (isHome) {
      const victories = matches
        .filter((match) => match.homeTeamId === teamId
        && match.homeTeamGoals > match.awayTeamGoals).length;
      return victories;
    }
    const victories = matches
      .filter((match) => match.awayTeamId === teamId
      && match.homeTeamGoals < match.awayTeamGoals).length;
    return victories;
  }

  static loss(matches: MatchTeamsNames[], teamId: number, isHome: boolean): number {
    if (isHome) {
      const losses = matches
        .filter((match) => match.homeTeamId === teamId
        && match.homeTeamGoals < match.awayTeamGoals).length;
      return losses;
    }
    const losses = matches
      .filter((match) => match.awayTeamId === teamId
      && match.homeTeamGoals > match.awayTeamGoals).length;
    return losses;
  }

  static points(matches: MatchTeamsNames[], teamId: number, isHome: boolean): number {
    const winPoints = this.victory(matches, teamId, isHome) * 3;
    const drawPoints = this.draw(matches, teamId, isHome);
    return winPoints + drawPoints;
  }

  static score(totalPoints: number, totalMatches: number) {
    return Number(((totalPoints / (totalMatches * 3)) * 100).toFixed(2));
  }

  static getTotalGames(matches: MatchTeamsNames[], teamId: number, isHome: boolean): number {
    if (isHome) {
      const totalGames = matches.filter((match) => match.homeTeamId === teamId).length;
      return totalGames;
    }
    const totalGames = matches.filter((match) => match.awayTeamId === teamId).length;
    return totalGames;
  }

  static getGoalsFavor(matches: MatchTeamsNames[], teamId: number, isHome: boolean) {
    if (isHome) {
      const goalsFavor = matches
        .filter((match) => match.homeTeamId === teamId)
        .reduce((acc, match) => acc + match.homeTeamGoals, 0);
      return goalsFavor;
    }
    const goalsFavor = matches
      .filter((match) => match.awayTeamId === teamId)
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return goalsFavor;
  }

  static getGoalsOwn(matches: MatchTeamsNames[], teamId: number, isHome: boolean) {
    if (isHome) {
      const goalsOwn = matches
        .filter((match) => match.homeTeamId === teamId)
        .reduce((acc, match) => acc + match.awayTeamGoals, 0);
      return goalsOwn;
    }
    const goalsOwn = matches
      .filter((match) => match.awayTeamId === teamId)
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);
    return goalsOwn;
  }

  static async getTeams() {
    const teams = await this.teamsModel.findAll();
    return teams;
  }

  static async sortLeaderBoard(leaderBoard: ILeaderboard[]) {
    leaderBoard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return leaderBoard;
  }

  static async homeLeaderBoard(matches: MatchTeamsNames[]) {
    const teams = await this.getTeams();
    return teams.map((team) => ({
      name: team.teamName,
      goalsFavor: this.getGoalsFavor(matches, team.id, true),
      goalsOwn: this.getGoalsOwn(matches, team.id, true),
      totalGames: this.getTotalGames(matches, team.id, true),
      totalDraws: this.draw(matches, team.id, true),
      totalLosses: this.loss(matches, team.id, true),
      totalPoints: this.points(matches, team.id, true),
      totalVictories: this.victory(matches, team.id, true),
      goalsBalance: this.getGoalsFavor(matches, team.id, true)
      - this.getGoalsOwn(matches, team.id, true),
      efficiency: this.score(
        this.points(matches, team.id, true),
        this.getTotalGames(matches, team.id, true),
      ),
    }));
  }

  static async awayLeaderBoard(matches: MatchTeamsNames[]) {
    const teams = await this.getTeams();
    return teams.map((team) => ({
      name: team.teamName,
      goalsFavor: this.getGoalsFavor(matches, team.id, false),
      goalsOwn: this.getGoalsOwn(matches, team.id, false),
      totalGames: this.getTotalGames(matches, team.id, false),
      totalDraws: this.draw(matches, team.id, false),
      totalLosses: this.loss(matches, team.id, false),
      totalPoints: this.points(matches, team.id, false),
      totalVictories: this.victory(matches, team.id, false),
      goalsBalance: this.getGoalsFavor(matches, team.id, false)
      - this.getGoalsOwn(matches, team.id, false),
      efficiency: this.score(
        this.points(matches, team.id, false),
        this.getTotalGames(matches, team.id, false),
      ),
    }));
  }

  static updateTeamStats(editTeam: ILeaderboard, newData: ILeaderboard) {
    const updateTeam = { ...editTeam };
    updateTeam.goalsFavor += newData.goalsFavor;
    updateTeam.goalsOwn += newData.goalsOwn;
    updateTeam.totalGames += newData.totalGames;
    updateTeam.totalDraws += newData.totalDraws;
    updateTeam.totalLosses += newData.totalLosses;
    updateTeam.totalPoints += newData.totalPoints;
    updateTeam.totalVictories += newData.totalVictories;
    updateTeam.efficiency = newData.efficiency;
    updateTeam.goalsBalance = editTeam.goalsFavor - editTeam.goalsOwn;

    return updateTeam;
  }

  public async leaderboard(isHome: boolean) {
    const matches = await this.findByProgress(false) as unknown as MatchTeamsNames[];
    const finishedBoard = isHome
      ? await LeaderBoardModel.homeLeaderBoard(matches)
      : await LeaderBoardModel.awayLeaderBoard(matches);

    return finishedBoard;
  }

  public async leaderBoardSort(isHome: boolean) {
    const leaderboard = await this.leaderboard(isHome);

    const leaderBoardSorted = await LeaderBoardModel.sortLeaderBoard(leaderboard);
    return leaderBoardSorted;
  }

  public async getOverallLeaderboard() {
    const [homeLeaderboard, awayLeaderboard] = await Promise
      .all([this.leaderBoardSort(true), this.leaderBoardSort(false)]);
    const overallLeaderboard = homeLeaderboard.map((homeTeam) => {
      const awayTeamStats = awayLeaderboard.find((awayTeam) => awayTeam.name === homeTeam.name);
      return awayTeamStats ? { ...homeTeam,
        ...awayTeamStats,
        goalsFavor: homeTeam.goalsFavor + awayTeamStats.goalsFavor,
        goalsOwn: homeTeam.goalsOwn + awayTeamStats.goalsOwn,
        totalGames: homeTeam.totalGames + awayTeamStats.totalGames,
        totalDraws: homeTeam.totalDraws + awayTeamStats.totalDraws,
        totalLosses: homeTeam.totalLosses + awayTeamStats.totalLosses,
        totalPoints: homeTeam.totalPoints + awayTeamStats.totalPoints,
        totalVictories: homeTeam.totalVictories + awayTeamStats.totalVictories,
        goalsBalance: homeTeam.goalsBalance + awayTeamStats.goalsBalance,
        efficiency: LeaderBoardModel.score(homeTeam.totalPoints
          + awayTeamStats.totalPoints, homeTeam.totalGames + awayTeamStats.totalGames) } : homeTeam;
    });
    return LeaderBoardModel.sortLeaderBoard(overallLeaderboard);
  }
}
