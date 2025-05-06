import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "sessions",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "movie_id",
      references: {
        model: "movies",
        key: "id",
      },
    },

    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "room_id",
      references: {
        model: "rooms",
        key: "id",
      },
    },

    startDate: {
      type: DataTypes.STRING,
      field: "start_date",
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    timestamps: true,
  },
);
