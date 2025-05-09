import nodemailer from "nodemailer";
import { ENV } from "../core/enviroment";

export class Email {
  private smtp: nodemailer.Transporter;

  constructor() {
    this.smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASSWORD,
      },
    });
  }

  public send = async ({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) => {
    return await this.smtp.sendMail({
      to,
      subject,
      html,
    });
  };
}
