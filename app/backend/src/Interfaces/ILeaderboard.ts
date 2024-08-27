export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface TeamStatus {
  totalGoalsOwn: number;
  totalGoalsFavor: number;
  victories: number;
  losses: number;
  draws: number;
  teamName: string;
}
