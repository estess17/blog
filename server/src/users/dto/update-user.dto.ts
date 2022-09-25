import {IsNotEmpty, IsString, IsEmail, IsInt, IsArray, IsEmpty} from 'class-validator';
import {ApiResponseProperty} from '@nestjs/swagger';


export class UpdateUserDto {
    @ApiResponseProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiResponseProperty()
    @IsString()
    avatar: string;
}
