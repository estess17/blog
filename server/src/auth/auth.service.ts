import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getOne({email});
        const isMatch = await bcrypt.compare(pass, user.password);

        if (isMatch) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
}
