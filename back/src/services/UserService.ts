import { QueryTypes } from "sequelize";
import { sequelize } from "../core/database";
import { User } from "../entities/User";
import UsersModel from "../models/UsersModel";
import { Hash } from "../utils/hash";
import { Token } from "../utils/token";
import { ENV } from "../core/enviroment";
import { Email } from "../utils/email";

export class UserService {
  static get = async (id: number) => {
    return await UsersModel.findOne({ where: { id } });
  };

  static recover = async (userEmail: string) => {
    const user = await UsersModel.findOne({ where: { email: userEmail } });
    if (!user) throw new Error("This user does not exist in the system");

    const code = (Math.random() * 1000000).toFixed(0);

    const recoveryToken = Token.generate({ code }, 10000, ENV.ACCESS_SECRET);

    await UsersModel.update({ recoveryToken }, { where: { email: userEmail } });

    const email = new Email();

    await email.send({
      to: userEmail,
      subject: "Recovery your account",
      html: `<p>Your recovery code is ${code}</p>`,
    });
  };

  static changePassword = async (
    code: string,
    newPassword: string,
    email: string,
  ) => {
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) throw new Error("This user does not exist in the system");

    const userTokenInfo = Token.verify(
      user.dataValues.recoveryToken,
      ENV.ACCESS_SECRET,
    );

    const isValid = userTokenInfo?.code === code;

    if (!isValid) throw new Error("The code is incorrect");

    await UsersModel.update(
      { password: await Hash.make(newPassword) },
      { where: { email } },
    );
  };

  static login = async (email: string, password: string) => {
    const user = await UsersModel.findOne({ where: { email } });

    if (!user) return false;

    const isMatch = await Hash.compare(password, user.dataValues.password);

    let token = null;
    if (isMatch) {
      token = Token.generate(
        { id: String(user.dataValues.id) },
        60,
        ENV.ACCESS_SECRET,
      );
    }

    // req.headers.autorization
    return token;
  };

  static getAll = async () => {
    return await UsersModel.findAll();
  };

  static create = async (data: Omit<User, "id">) => {
    const password = await Hash.make(data.password);
    const formatedData = { ...data, password };

    return await UsersModel.create(formatedData);
  };

  static getSessions = async (id: number) => {
    return await sequelize.query(
      `
      SELECT 
        u.name AS user_name,
        u.cpf AS user_cpf,
        m.title AS movie_title, 
        m.description AS movie_description,
        r.id AS room_id,
        r.description AS room_description,
        m.duration AS duration,
        s.start_date AS start_date
      FROM users u
      JOIN tickets t ON t.user_id = u.id
      JOIN sessions s ON s.id = t.session_id
      JOIN movies m ON m.id = s.movie_id
      JOIN rooms r ON r.id = s.room_id
      WHERE u.id = :userId;
    `,
      { replacements: { userId: id }, type: QueryTypes.SELECT },
    );
  };

  static update = async (id: number, data: Partial<User>) => {
    await UsersModel.update(data, { where: { id } });
    return await UsersModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    await UsersModel.destroy({ where: { id } });
  };
}
