
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    getAll(): Promise<any> {
        return this.categoryService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.categoryService.getById(id);
    }

    @Post()
    create(@Body() data: CreateCategoryDto): Promise<any> {
        return this.categoryService.create(data);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDto): Promise<any> {
        return this.categoryService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.categoryService.delete(id);
    }
}
