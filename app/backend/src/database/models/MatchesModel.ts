import IMatches from '../../Interfaces/IMatches';
import IMatchesUpdate from '../../Interfaces/IMatchesUpdate';
import { IMatchesModel } from '../../Interfaces/IMatchesModel';
import SequelizeMatches from './SequelizeMatchesModel';
import SequelizeTeams from './SequelizeTeamsModel';
import { INewMatches } from '../../Interfaces/INewMatches';

const errorMessage = 'Match not found';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  public async findAll(): Promise<SequelizeMatches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['id', 'teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['id', 'teamName'],
        },
      ],
    });

    return matches;
  }

  public async findByProgress(inProgress: boolean): Promise<SequelizeMatches[]> {
    const matchesByProgress = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['id', 'teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['id', 'teamName'],
        },
      ],
      where: { inProgress },
    });
    return matchesByProgress;
  }

  public async finishMatch(matchId: IMatches['id']): Promise<SequelizeMatches> {
    const [affectedRows] = await this.model
      .update({ inProgress: false }, { where: { id: matchId } });
    const match = await this.model.findByPk(matchId);
    if (affectedRows === 0 || !match) throw new Error(errorMessage);
    return match;
  }

  public async updateMatch(
    matchId: IMatches['id'],
    matchData: IMatchesUpdate,
  ): Promise<SequelizeMatches | null> {
    const { homeTeamGoals, awayTeamGoals } = matchData;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id: matchId } });
    const match = await this.model.findByPk(matchId);
    return match;
  }

  public async findMatchById(matchId: IMatches['id']): Promise<SequelizeMatches | null> {
    const match = await this.model.findByPk(matchId);
    if (match) return null;
    return match;
  }

  public async createMatch(matchData: INewMatches): Promise<SequelizeMatches | null> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matchData;
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}
