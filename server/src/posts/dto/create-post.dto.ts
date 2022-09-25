import {ApiResponseProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';


export class CreatePostDto {
    @ApiResponseProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiResponseProperty()
    @IsNotEmpty()
    body: any;
}
