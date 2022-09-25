import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma.service';
import {User, Prisma} from '@prisma/client';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateUserDto} from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({include: {posts: true}});
    }

    async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {posts: true},
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user: User | null = await this.prisma.user.findUnique({where: {email: createUserDto.email}});

        if (user) {
            throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
        }

        const hash = await bcrypt.hash(createUserDto.password, 10);

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hash,
            },
        });
    }

    async update(updateUserDto: UpdateUserDto, id: number): Promise<User> {
        return await this.prisma.user.update({
            where: {id},
            data: updateUserDto,
        });
    }

    async delete(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: {id},
        });
    }

    async findUserPosts(id: number) {
        return await this.prisma.post.findMany({where: {authorId: id}});
    }
}
