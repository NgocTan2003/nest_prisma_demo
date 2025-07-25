import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { BadRequestResponse, SuccessResponse } from 'src/common/response';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) { }


    getAll = async (): Promise<any> => {
        return await this.prismaService.category.findMany();
    }

    create = async (data: CreateCategoryDto): Promise<any> => {
        const exist = await this.prismaService.category.findFirst({
            where: { name: data.name }
        });
        
        if (exist) {
            BadRequestResponse('Category already exists');
        }

        const category = await this.prismaService.category.create({
            data: { ...data }
        });

        if (!category) {
            BadRequestResponse('Failed to create category');
        }

        return SuccessResponse(category, 'Category created successfully');
    }

    getById = async (id: number): Promise<any> => {
        const category = await this.prismaService.category.findFirst({
            where: { id },
        });

        if (!category) {
            BadRequestResponse('Category not found');
            return;
        }

        return SuccessResponse(category, 'Get Successfully');
    }

    update = async (id: number, data: UpdateCategoryDto): Promise<any> => {
        const category = await this.prismaService.category.findFirst({
            where: { id },
        });

        if (!category) {
            BadRequestResponse('Category not found');
        }

        const updatedCategory = await this.prismaService.category.update({
            where: { id },
            data
        });

        if (!updatedCategory) {
            BadRequestResponse('Failed to update category');
        }

        return SuccessResponse(updatedCategory, 'Updated Successfully');
    }

    delete = async (id: number): Promise<any> => {
        const category = await this.prismaService.category.findFirst({
            where: { id },
        });

        if (!category) {
            BadRequestResponse('Category not found');
        }

        await this.prismaService.category.delete({
            where: { id }
        });

        return SuccessResponse('Deleted Successfully');
    }

}
