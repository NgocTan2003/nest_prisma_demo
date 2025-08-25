import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('posts')
export class PostController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    getAll(): Promise<any> {
        return this.postsService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.postsService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: CreatePostDto): Promise<any> {
        return this.postsService.create(data);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePostDto): Promise<any> {
        return this.postsService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.postsService.delete(id);
    }
}
