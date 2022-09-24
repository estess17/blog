import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import {ApiResponseProperty} from '@nestjs/swagger';


export class CreateUserDto {
    @ApiResponseProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiResponseProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiResponseProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
}
