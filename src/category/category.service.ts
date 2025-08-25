import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async getAll(): Promise<any> {
        try {
            const categories = await this.categoryRepository.find();
            return SuccessResponse(categories, 'Categories retrieved successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get categories');
        }
    }

    async create(data: CreateCategoryDto): Promise<any> {
        try {
            const exist = await this.categoryRepository.findOne({ where: { name: data.name } });
            if (exist) {
                return BadRequestResponse('Category already exists');
            }
            const category = this.categoryRepository.create(data);
            await this.categoryRepository.save(category);
            return SuccessResponse(category, 'Category created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create category');
        }
    }

    async getById(id: number): Promise<any> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            return SuccessResponse(category, 'Category retrieved successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get category');
        }
    }

    async update(id: number, data: UpdateCategoryDto): Promise<any> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            await this.categoryRepository.update(id, data);
            const updatedCategory = await this.categoryRepository.findOne({ where: { id } });
            if (!updatedCategory) {
                return BadRequestResponse('Failed to update category');
            }
            return SuccessResponse(updatedCategory, 'Category updated successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to update category');
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            await this.categoryRepository.delete(id);
            return SuccessResponse('Category deleted successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to delete category');
        }
    }

    async findOneById(id: number): Promise<Category | undefined> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        return category || undefined;
    }
}
