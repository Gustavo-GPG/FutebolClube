import { NewEntity } from '../../Interfaces/index';
import ITeams from '../../Interfaces/ITeams';
import { ITeamsModel } from '../../Interfaces/ITeamsModel';
import SequelizeTeams from './SequelizeTeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async create(data: NewEntity<ITeams>): Promise<ITeams> {
    const dbData = await this.model.create(data);

    const { id, teamName }:ITeams = dbData;
    return { id, teamName };
  }

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();

    return dbData.map(({ id, teamName }:ITeams) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { teamName }:ITeams = dbData;
    return { id, teamName };
  }

  async update(id: ITeams['id'], data: Partial<NewEntity<ITeams>>): Promise<ITeams | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findById(id);
  }

  async delete(id: ITeams['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
