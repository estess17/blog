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
        const user = await this.usersService.findOne({email});

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);

            if (isMatch) {
                return user;
            }
        }

        return null;
    }

    async login(user: any) {
        const payload = {id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }

    async register(createUserDto) {
        const user = await this.usersService.create(createUserDto);
        const payload = {id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
