import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';
import { Post } from './entities/post.entity';
import { CategoryService } from 'src/category/category.service';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly categoryService: CategoryService,
        private readonly usersServcice: UsersService,
    ) { }

    async getAll(): Promise<any> {
        try {
            const posts = await this.postRepository.find({ relations: ['owner', 'category'] });
            return SuccessResponse(posts, 'Posts retrieved successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get posts');
        }
    }

    async create(data: CreatePostDto): Promise<any> {
        try {
            const exist = await this.postRepository.findOne({ where: { title: data.title } });
            if (exist) {
                return BadRequestResponse('Post already exists');
            }

            const category = await this.categoryService.findOneById(data.categoryId);
            if (!category) {
                return BadRequestResponse('Category not found');
            }

            const owner = await this.usersServcice.findOneById(data.ownerId);
            if (!owner) {
                return BadRequestResponse('Owner not found');
            }

            const post = this.postRepository.create({
                ...data,
                category,
                owner,
            });
            await this.postRepository.save(post);
            return SuccessResponse(post, 'Post created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create post');
        }
    }

    async getById(id: number): Promise<any> {
        try {
            const post = await this.postRepository.findOne({ where: { id }, relations: ['owner', 'category'] });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            return SuccessResponse(post, 'Post retrieved successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get post');
        }
    }

    async update(id: number, data: UpdatePostDto): Promise<any> {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            await this.postRepository.update(id, data);
            const updatedPost = await this.postRepository.findOne({ where: { id }, relations: ['owner', 'category'] });
            if (!updatedPost) {
                return BadRequestResponse('Failed to update post');
            }
            return SuccessResponse(updatedPost, 'Post updated successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to update post');
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                return BadRequestResponse('Post not found');
            }
            await this.postRepository.delete(id);
            return SuccessResponse('Post deleted successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to delete post');
        }
    }
}
