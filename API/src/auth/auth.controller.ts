import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './DTOs/singIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.Dec';
import { MailerService } from '../mailer/mailer.service'; 

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private mailerService: MailerService, 
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    singIn(@Body() singInDto: SingInDto) {
        return this.authService.signIn(singInDto.email, singInDto.pass);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: Request) {
        return req['user'];
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('verifyEmail')
    async verifyEmail(@Body() { email }: { email: string }) {
        const token = await this.authService.generateEmailVerificationToken(email);
        console.log("OLHA ESSE EMAIL: ", email, "OLHA ESSE TOKEN: ", token);
        await this.mailerService.sendVerificationEmail(email, token); 
        return { message: 'Verificação de e-mail enviada!' };
    }


    @Public()
    @HttpCode(HttpStatus.OK)
    @Get('verifyEmail/:token')
    async verifyEmailToken(@Param('token') token: string) {
        const result = await this.authService.verifyEmailToken(token);
        if (result) {
            return { message: 'E-mail verificado com sucesso!' };
        } else {
            return { message: 'Falha na verificação do e-mail' };
        }
    }

    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('verifySecondEmail')
    async verifySecondEmail(@Body() { email, firstMail }: { email: string, firstMail: string }) {
        console.log("OLHA ESSE EMAIL: ", email, "OLHA ESSE PRIMEIRO EMAIL: ", firstMail);
        await this.authService.insertSecondEmail(firstMail, email);
        const token = await this.authService.generateSecondEmailVerificationToken(email);
        console.log("OLHA ESSE EMAIL: ", email, "OLHA ESSE TOKEN: ", token);
        await this.mailerService.sendVerificationEmail(email, token); 
        return { message: 'Verificação de e-mail enviada!' };
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('sendSms')
    async sendSms(@Body() { email, phone }: { email: string; phone: string }) {
        return await this.authService.sendSmsVerification(email, phone);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('verifySms')
    async verifySms(@Body() { email, code }: { email: string; code: string }) {
        return await this.authService.verifySmsCode(email, code);
    }

}


