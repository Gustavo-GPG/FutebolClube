import ITeams from './ITeams';

export interface ITeamsModel {
  create(data: Partial<ITeams>): Promise<ITeams>
  findAll(): Promise<ITeams[]>
  findById(id: ITeams['id']): Promise<ITeams | null>
  update(id: ITeams['id'], data: Partial<ITeams>): Promise<ITeams | null>
  delete(id: ITeams['id']): Promise<number>
}
