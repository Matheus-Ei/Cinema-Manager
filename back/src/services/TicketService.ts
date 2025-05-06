import { QueryTypes } from "sequelize";
import { sequelize } from "../core/database";
import { Ticket } from "../entities/Ticket";
import TicketsModel from "../models/TicketsModel";

export class TicketService {
  static get = async (id: number) => {
    return await TicketsModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await TicketsModel.findAll();
  };

  static create = async (data: Omit<Ticket, "id">) => {
    return await TicketsModel.create(data);
  };

  static buy = async ({
    row,
    column,
    sessionId,
    userId,
  }: {
    row: string;
    column: string;
    sessionId: number;
    userId: number;
  }) => {
    const result = await sequelize.query(
      `
    INSERT INTO tickets (user_id, session_id, place_id, "createdAt", "updatedAt")
    SELECT :userId, :sessionId, p.id, NOW(), NOW()
    FROM sessions s
    JOIN rooms r ON r.id = s.room_id
    JOIN place_patterns pp ON pp.id = r.place_pattern_id
    JOIN places p ON p."placePatternId" = pp.id
    WHERE s.id = :sessionId
      AND p.row = :row
      AND p.column = :column
      AND p.id NOT IN (
        SELECT t.place_id
        FROM tickets t
        WHERE t.session_id = :sessionId
      )
    RETURNING *;
    `,
      {
        replacements: { row, column, sessionId, userId },
        type: QueryTypes.INSERT,
      },
    );

    if (!result[1]) {
      throw new Error("This place is already in use in this session.");
    }

    return result[0];
  };

  static update = async (id: number, data: Partial<Ticket>) => {
    await TicketsModel.update(data, { where: { id } });
    return await TicketsModel.findOne({ where: { id } });
  };

  static cancel = async (id: number) => {
    await TicketsModel.update({ status: "desactivated" }, { where: { id } });
  };
}
