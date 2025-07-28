import { Controller, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    create(@Body() data: { name: string }) {
        return this.roleService.create(data);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: { name: string }) {
        return this.roleService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.delete(id);
    }
}
