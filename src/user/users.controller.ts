import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'generated/prisma';
import { UpdateUserDto } from './dto/user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.usersService.getById(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto): Promise<any> {
        return this.usersService.update(id, data);
    }
}
