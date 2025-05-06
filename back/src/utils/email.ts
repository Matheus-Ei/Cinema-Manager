import nodemailer from "nodemailer";

export class Email {
  private smtp: nodemailer.Transporter;

  constructor() {
    this.smtp = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "matheus.petri.eickhoff@unochapeco.edu.br",
        pass: "efjb nwaj gvck vubk",
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
