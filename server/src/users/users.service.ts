import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma.service';
import {User, Prisma} from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async getAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async create(createUserDto): Promise<any> {
        const user = await this.prisma.user.findUnique({where: {email: createUserDto.email}});

        if (user) {
            throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
        }

        const hash = await bcrypt.hash(createUserDto.password, 10);

        const data = {
            ...createUserDto,
            password: hash,
        };

        return this.prisma.user.create({data});
    }
}
