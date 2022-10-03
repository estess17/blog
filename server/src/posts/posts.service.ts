import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PrismaService} from '../prisma.service';
import {Post, Prisma} from '@prisma/client';


@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createPostDto: CreatePostDto, user): Promise<Post> {
        const data = {
            ...createPostDto,
            authorId: user.id,
        };

        return await this.prisma.post.create({data});
    }

    async findAll(): Promise<Post[]> {
        return await this.prisma.post.findMany({include: {author: true, comments: true}});
    }

    async findOne(id: number) {
        return await this.prisma.post.findUnique({where: {id}, include: {author: true}});
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        return await this.prisma.post.update({where: {id}, data: updatePostDto});
    }

    async remove(id: number) {
        return await this.prisma.post.delete({where: {id}});
    }
}
