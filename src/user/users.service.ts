
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { ResponseUpdateUser } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }


    async getAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    async getById(id: number): Promise<UserDto> {
        const user = await this.prismaService.user.findFirst({
            where: { id },
        });

        if (!user) {
            return {
                message: 'User not found',
            }

        }
        return {
            message: 'Get Successfully',
            user: user,
        };
    }

    async update(id: number, data: UpdateUserDto): Promise<ResponseUpdateUser> {
        const user = await this.prismaService.user.findFirst({
            where: { id },
        });
        if (!user) {
            return {
                message: 'User not found',
            }
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data
        });

        if (!updatedUser) {
            return {
                message: 'Failed to update user',
            }
        }
        return {
            message: 'Update Successfully',
        };
    }

}
