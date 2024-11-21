import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    
    // aqui você deve inserir o usuario e senha que irá enviar emails
    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', 
        port: 465,               
        auth: {
          user: 'mykyxxxx@gmail.com',     
          pass: ''   //Insira uma senha valida ou uma senha de app do google    
        }
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
