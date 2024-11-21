import { IsNotEmpty } from "class-validator";

export class SingInDto {
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    pass: string;
}