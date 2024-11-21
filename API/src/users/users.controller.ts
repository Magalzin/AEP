import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put , Request} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "./DTO/users.dto";
import { UsersService } from "./users.service";
import { Public } from "src/auth/public.dec";

@Controller("users")
export class UsersController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private usersService: UsersService,
    ) { }

    @Public()
    @Get()
    getUsersList() {
        return this.userRepository.find();
    }
    @Get('/user')
    async getUser(@Request() req) {
    return req.user;
  }
    @Get(":id")
    async getUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        return user;
    }

    @Public()
    @Post()
    createUser(@Body() userDto: UserDTO) {
        const user = this.userRepository.create();

        user.name = userDto.name;
        user.email = userDto.email;
        user.password = userDto.password;
        user.gold = userDto.gold;
        user.phone = userDto.phone;
        user.role = userDto.role;
        user.isActive = userDto.isActive;

        console.log(user);
        this.userRepository.save(user);

        return user;
    }

    @Public()
    @Put(":id")
    async updateUserById(@Param("id") id: number, @Body() userDto: UserDTO) {
        const user = this.userRepository.create();

        user.name = userDto.name;
        user.email = userDto.email;
        user.password = userDto.password;
        user.gold = userDto.gold;
        user.role = userDto.role;
        user.isActive = userDto.isActive;

        this.usersService.update(id, user);
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.userRepository.delete({ id: user.id });
    }
}