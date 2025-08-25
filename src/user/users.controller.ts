import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';
import { PageNumberDto, UserFilterDto, UserListQueryDto } from 'src/common/pagination/dto/page-query.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll(
        @Query() query: UserListQueryDto
    ): Promise<User[]> {
        return this.usersService.getAll(query);
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
