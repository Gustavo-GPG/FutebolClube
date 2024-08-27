import SequelizeMatches from '../database/models/SequelizeMatchesModel';
import IMatches from './IMatches';
import MatchReturn from './IMatchesReturn';
import IMatchesUpdate from './IMatchesUpdate';
import { INewMatches } from './INewMatches';

export interface IMatchesModel {
  findAll(): Promise<SequelizeMatches[]>;
  findByProgress(inProgress: boolean): Promise<SequelizeMatches[] | MatchReturn[]>;
  finishMatch(matchId: IMatches['id']): Promise<SequelizeMatches>;
  updateMatch(matchId: IMatches['id'], matchData: IMatchesUpdate): Promise<SequelizeMatches | null>;
  createMatch(matchData: INewMatches): Promise<SequelizeMatches | null>;
  findMatchById(matchId: IMatches['id']): Promise<SequelizeMatches | null>;
}
