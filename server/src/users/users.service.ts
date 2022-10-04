import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma.service';
import {User, Prisma} from '@prisma/client';
import {UpdateUserDto} from './dto/update-user.dto';
import {CreateUserDto} from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {email: createUserDto.email}});

        if (user) {
            throw new ConflictException(`User with email '${createUserDto.email}' already exists`);
        }

        const hash = await bcrypt.hash(createUserDto.password, 10);

        return await this.prisma.user.create({data: {...createUserDto, password: hash}});
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany({include: {posts: true}});
    }

    async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput, include: {posts: true},
        });

        if (!user) {
            throw new NotFoundException(`User doesnt exists`);
        }

        return user;
    }

    async update(updateUserDto: UpdateUserDto, id: number): Promise<User> {
        await this.checkIfUserExist(id);
        return await this.prisma.user.update({where: {id}, data: updateUserDto});
    }

    async delete(id: number): Promise<User> {
        await this.checkIfUserExist(id);
        return await this.prisma.user.delete({where: {id}});
    }

    async findUserPosts(id: number) {
        await this.checkIfUserExist(id);
        return await this.prisma.post.findMany({where: {authorId: id}});
    }

    private async checkIfUserExist(id: number) {
        const user = await this.prisma.user.findUnique({where: {id}});

        if (!user) {
            throw new NotFoundException(`User with id ${id} doesnt exists`);
        }
    }
}
