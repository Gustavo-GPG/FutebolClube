import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model } from 'sequelize';
import db from '.';
import SequelizeTeams from './SequelizeTeamsModel';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatches;
