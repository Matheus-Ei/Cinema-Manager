import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "movies",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagePath: {
      field: "image_path",
      type: DataTypes.TEXT,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    timestamps: true,
  },
);
