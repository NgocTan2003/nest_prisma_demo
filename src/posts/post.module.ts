import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
    imports: [PrismaModule],
    controllers: [PostController],
    providers: [PostsService],
})
export class PostModule { }
