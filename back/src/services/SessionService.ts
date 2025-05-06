import { QueryTypes } from "sequelize";
import { sequelize } from "../core/database";
import { Place } from "../entities/Place";
import { Session } from "../entities/Session";
import SessionsModel from "../models/SessionsModel";

export class SessionService {
  static get = async (id: number) => {
    return await SessionsModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await SessionsModel.findAll();
  };

  static getFeedback = async (id: number) => {
    return await sequelize.query(
      `
      SELECT
        COUNT(s.id)::INTEGER AS sold_places,
        SUM(s.price) AS value_sold
      FROM sessions s
        JOIN tickets t ON t.session_id = s.id
      GROUP BY s.id
      HAVING s.id = :sessionId;
`,
      { replacements: { sessionId: id }, type: QueryTypes.SELECT },
    );
  };

  static findFreePlaces = async (id: number) => {
    const response = await sequelize.query<Place[]>(
      `
        SELECT DISTINCT
          p.id,
          p.row,
          p.column
        FROM sessions s
          JOIN rooms r ON r.id = s.room_id
          JOIN place_patterns pp ON pp.id = r.place_pattern_id
          JOIN places p ON p."placePatternId" = pp.id
        WHERE s.id = :id AND p.id NOT IN (SELECT id FROM tickets WHERE session_id = s.id)
        ORDER BY p.row, p.column
      `,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      },
    );

    return response;
  };

  static create = async (data: Omit<Session, "id">) => {
    return await SessionsModel.create(data);
  };

  static update = async (id: number, data: Partial<Session>) => {
    await SessionsModel.update(data, { where: { id } });
    return await SessionsModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    await SessionsModel.destroy({ where: { id } });
  };
}
