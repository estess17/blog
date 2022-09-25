import {Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.findOne({id: +id});
    }

    @Get(':id/posts')
    getUserPost(@Param('id') id: string) {
        return this.usersService.findUserPosts(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(updateUserDto, +id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
