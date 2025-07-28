import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAll(): Promise<any> {
        try {
            return await this.prismaService.post.findMany();
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get posts');
        }
    }

    async create(data: CreatePostDto): Promise<any> {
        try {
            const exist = await this.prismaService.post.findFirst({
                where: { title: data.title }
            });
            if (exist) {
                return BadRequestResponse('Post already exists');
            }
            const category = await this.prismaService.category.findFirst({
                where: { id: data.categoryId }
            });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            const post = await this.prismaService.post.create({
                data: { ...data }
            });
            if (!post) {
                return BadRequestResponse('Failed to create post');
            }
            return SuccessResponse(post, 'Post created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create post');
        }
    }

    async getById(id: number): Promise<any> {
        try {
            const post = await this.prismaService.post.findFirst({
                where: { id },
            });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            return SuccessResponse(post, 'Get Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get post');
        }
    }

    async update(id: number, data: UpdatePostDto): Promise<any> {
        try {
            const post = await this.prismaService.post.findFirst({
                where: { id },
            });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            const updatedPost = await this.prismaService.post.update({
                where: { id },
                data
            });
            if (!updatedPost) {
                return BadRequestResponse('Failed to update post');
            }
            return SuccessResponse(updatedPost, 'Updated Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to update post');
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const post = await this.prismaService.post.findFirst({
                where: { id },
            });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            await this.prismaService.post.delete({
                where: { id }
            });
            return SuccessResponse('Deleted Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to delete post');
        }
    }
}
