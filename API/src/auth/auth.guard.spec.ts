import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let userService: UsersService;
  let reflector: Reflector

  beforeEach(() => {
    jwtService= new JwtService({});
    authGuard = new AuthGuard(jwtService, reflector, userService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
