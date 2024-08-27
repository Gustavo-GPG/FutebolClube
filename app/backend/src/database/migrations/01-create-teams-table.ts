import { DataTypes, Model, QueryInterface } from "sequelize";
import ITeams from "../../Interfaces/ITeams";
import { query } from "express";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeams>>("teams", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "team_name",
      },
      });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("teams");
  }
}