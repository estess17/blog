import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto, @Req() req) {
        return this.postsService.create(createPostDto, req.user);
    }

    @Get()
    getAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
