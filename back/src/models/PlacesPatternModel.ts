import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "place_patterns",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },

  {
    timestamps: false,
  },
);
