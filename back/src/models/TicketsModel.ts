import { DataTypes } from "sequelize";
import { sequelize } from "../core/database";

export default sequelize.define(
  "tickets",

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },

    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "session_id",
      references: {
        model: "sessions",
        key: "id",
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },

    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "place_id",
      references: {
        model: "places",
        key: "id",
      },
    },
  },

  {
    timestamps: true,
  },
);
