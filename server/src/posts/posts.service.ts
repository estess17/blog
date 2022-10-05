import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PrismaService} from '../prisma.service';
import {Post} from '@prisma/client';


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
        return await this.prisma.post.findMany({
            orderBy: {createdAt: 'desc'},
            include: {author: true, comments: true}
        });
    }

    async findOne(id: number): Promise<Post> {
        const post = await this.prisma.post.update({
            where: {id},
            data: {views: {increment: 1}},
            include: {author: true}
        })
        //const post = await this.prisma.post.findUnique({where: {id}, include: {author: true}});

        if (!post) {
            this.throwPostNotFound(id);
        }

        return post;
    }

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        await this.checkIfPostExist(id);
        return await this.prisma.post.update({where: {id}, data: updatePostDto});
    }

    async remove(id: number): Promise<Post> {
        await this.checkIfPostExist(id);
        return await this.prisma.post.delete({where: {id}});
    }

    private async checkIfPostExist(id: number) {
        const post = await this.prisma.post.findUnique({where: {id}});

        if (!post) {
            this.throwPostNotFound(id);
        }
    }

    private throwPostNotFound(id: number) {
        throw new NotFoundException(`Post with id ${id} not found`);
    }
}
