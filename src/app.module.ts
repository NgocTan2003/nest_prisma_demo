import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
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
    RoleModule,
    CategoryModule,
    UsersModule, PrismaModule, AuthModule, PostModule,],
  controllers: [
    RoleController,
    CategoryController,
    PostController, AppController],
  providers: [
    RoleService,
    CategoryService,
    PostsService, AppService],
})
export class AppModule { }
