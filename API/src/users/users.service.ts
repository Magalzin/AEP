import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userDataRepository: Repository<User>,
  ) { }

  async updateVerificationCode(email: string, verificationCode: string) {
    const user = await this.findOne(email); 
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.userDataRepository.update(user.id, {
      verificationCode: verificationCode,
    });

  }

  async insertSecondEmail(email: string, secondEmail: string) {
    const user = await this.findOne(email); 
    console.log("Informações Insert Second:",user.id, user.email);
    await this.userDataRepository.update(user.id, {
      secondEmail: secondEmail,
      isEmailVerified: true,
      gold: 10000
    })

  }

  async update(id: number, user: User) {
    const userToUpdate = this.fidnOneById(id);
    console.log("User antes: ", (await userToUpdate).isActive);

    if (!userToUpdate) {
      throw new NotFoundException("Usuário não encontrado");
    }
    
    await this.userDataRepository.update(id, user);

    const userUpdated = this.fidnOneById(id);
    console.log("Usuario updated:", (await userUpdated).isActive);

  }

  async fidnOneById(id: number): Promise<User> {
    return this.userDataRepository.findOneBy({ id: id });
  }

  // Encontra um usuário pelo nome
  async findOne(email: string): Promise<User> {
    return this.userDataRepository.findOneBy({ email: email });
  }

  async findOneSecondEmail(email: string): Promise<User> {
    return this.userDataRepository.findOneBy({ secondEmail: email });
  }

}
