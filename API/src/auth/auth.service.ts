import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const load = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(load),
    };
  }

  async generateEmailVerificationToken(email: string): Promise<string> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { email: user.email };
    return await this.jwtService.signAsync(payload, { expiresIn: '1h' }); // Expira em 1 hora
  }

  async verifyEmailToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('Email decoded', decoded.email);
      const user = await this.userService.findOne(decoded.email);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      user.isActive = true; 
      await this.userService.update(user.id, user); 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

   async sendSmsVerification(email: string, phone: string) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
    await this.userService.updateVerificationCode(email, verificationCode);

    console.log('Verification Code: ' + verificationCode);
    return { message: 'Código de verificação enviado por SMS!' };
  }

  async verifySmsCode(email: string, code: string) {
    const user = await this.userService.findOne(email);
    user.gold += 10000;
    console.log(user.gold);
    if (user.verificationCode === code) {
      user.isPhoneVerified = true;
      await this.userService.update(user.id, user);
      return { message: 'Número de telefone verificado com sucesso!' };
    }
    throw new UnauthorizedException('Código de verificação inválido.');
  }

  async insertSecondEmail(email: string, secondEmail: string) {
    await this.userService.insertSecondEmail(email, secondEmail);
  }

  async generateSecondEmailVerificationToken(email: string): Promise<string> {
    const user = await this.userService.findOneSecondEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const payload = { email: user.email };
    return await this.jwtService.signAsync(payload, { expiresIn: '1h' }); // Expira em 1 hora
  }
}
