import { UsersModule } from './user/users.module';
import { UsersService } from './user/users.service';
import { UsersController } from './user/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PostsService } from './posts/posts.service';
import { PostModule } from './posts/post.module';
import { PostController } from './posts/posts.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule, PrismaModule, AuthModule, PostModule,],
  controllers: [
    PostController, AppController],
  providers: [
    PostsService, AppService],
})
export class AppModule { }
