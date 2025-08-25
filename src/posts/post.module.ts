import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { UsersModule } from 'src/user/users.module';


@Module({
    imports: [TypeOrmModule.forFeature([Post]), CategoryModule, UsersModule],
    controllers: [PostController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostModule { }
