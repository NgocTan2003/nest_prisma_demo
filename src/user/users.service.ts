
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';
import { UpdateUserDto } from './dto/user.dto';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from 'src/common/response';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }


    async getAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    async getById(id: number): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: { id },
        });

        if (!user) {
            NotFoundResponse('User not found');
            return;
        }

        return SuccessResponse(user, 'Get Successfully');
    }

    async update(id: number, data: UpdateUserDto): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: { id },
        });
        if (!user) {
            NotFoundResponse('User not found');
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data
        });

        if (!updatedUser) {
            BadRequestResponse('Failed to create user');

        }
        return SuccessResponse('Updated Successfully');
    }

}
