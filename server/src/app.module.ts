import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import { PostsModule } from './posts/posts.module';


@Module({
    imports: [AuthModule, UsersModule, PostsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
