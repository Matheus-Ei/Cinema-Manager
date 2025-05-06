import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "rooms",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    placePatternId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "place_pattern_id",
      references: {
        model: "place_patterns",
        key: "id",
      },
    },
  },

  {
    timestamps: true,
  },
);
