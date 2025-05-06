import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "places",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    placePatternId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "place_patterns",
        key: "id",
      },
    },

    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    column: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    timestamps: true,
  },
);
