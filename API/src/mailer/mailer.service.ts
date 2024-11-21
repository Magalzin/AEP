import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mykyxxxx@gmail.com',
        pass: 'mrci czsz fujg vpla',
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `http://localhost:3000/auth/verifyEmail/${token}`;
    console.log("Enviando para o email:", email); 
    console.log("Teste:", email);
    if (!email || email.trim() === "") {
      throw new Error('O campo "email" está vazio ou inválido.');
    }
    const mailOptions = {
      from: 'mykyxxxx@gmail.com',
      to: email,
      subject: 'Verifique seu E-mail',
      html: `<p>Por favor, clique no link para verificar seu e-mail:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
