import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    getAll = async (): Promise<any> => {
        return await this.prismaService.post.findMany();
    }

    create = async (data: CreatePostDto): Promise<any> => {
        const exist = await this.prismaService.post.findFirst({
            where: { title: data.title }
        });

        if (exist) {
            BadRequestResponse('Post already exists');
        }

        const category = await this.prismaService.category.findFirst({
            where: { id: data.categoryId }
        });
        
        if (!category) {
            BadRequestResponse('Category not found');
        }

        const post = await this.prismaService.post.create({
            data: { ...data }
        });

        if (!post) {
            BadRequestResponse('Failed to create post');
        }

        return SuccessResponse(post, 'Post created successfully');
    }

    getById = async (id: number): Promise<any> => {
        const post = await this.prismaService.post.findFirst({
            where: { id },
        });

        if (!post) {
            BadRequestResponse('Post not found');
            return;
        }

        return SuccessResponse(post, 'Get Successfully');
    }

    update = async (id: number, data: UpdatePostDto): Promise<any> => {
        const post = await this.prismaService.post.findFirst({
            where: { id },
        });

        if (!post) {
            BadRequestResponse('Post not found');
        }

        const updatedPost = await this.prismaService.post.update({
            where: { id },
            data
        });

        if (!updatedPost) {
            BadRequestResponse('Failed to update post');
        }

        return SuccessResponse(updatedPost, 'Updated Successfully');
    }

    delete = async (id: number): Promise<any> => {
        const post = await this.prismaService.post.findFirst({
            where: { id },
        });

        if (!post) {
            BadRequestResponse('Post not found');
        }

        await this.prismaService.post.delete({
            where: { id }
        });

        return SuccessResponse('Deleted Successfully');
    }
}
