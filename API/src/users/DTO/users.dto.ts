import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator"

export class UserDTO {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    gold: number;

    phone: string;

    @IsNotEmpty()
    role: string

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

}