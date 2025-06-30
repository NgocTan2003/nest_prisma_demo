import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';


@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostsService],
})
export class PostModule { }
