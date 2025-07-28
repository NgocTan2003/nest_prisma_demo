import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) { }

    async getAll(): Promise<any> {
        try {
            return await this.prismaService.category.findMany();
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get categories');
        }
    }

    async create(data: CreateCategoryDto): Promise<any> {
        try {
            const exist = await this.prismaService.category.findFirst({
                where: { name: data.name }
            });
            if (exist) {
                return BadRequestResponse('Category already exists');
            }
            const category = await this.prismaService.category.create({
                data: { ...data }
            });
            if (!category) {
                return BadRequestResponse('Failed to create category');
            }
            return SuccessResponse(category, 'Category created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create category');
        }
    }

    async getById(id: number): Promise<any> {
        try {
            const category = await this.prismaService.category.findFirst({
                where: { id },
            });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            return SuccessResponse(category, 'Get Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to get category');
        }
    }

    async update(id: number, data: UpdateCategoryDto): Promise<any> {
        try {
            const category = await this.prismaService.category.findFirst({
                where: { id },
            });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            const updatedCategory = await this.prismaService.category.update({
                where: { id },
                data
            });
            if (!updatedCategory) {
                return BadRequestResponse('Failed to update category');
            }
            return SuccessResponse(updatedCategory, 'Updated Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to update category');
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const category = await this.prismaService.category.findFirst({
                where: { id },
            });
            if (!category) {
                return BadRequestResponse('Category not found');
            }
            await this.prismaService.category.delete({
                where: { id }
            });
            return SuccessResponse('Deleted Successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to delete category');
        }
    }
}
