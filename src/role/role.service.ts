import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from '../common/response';

@Injectable()
export class RoleService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data: { name: string }): Promise<any> {
        try {
            const role = await this.prismaService.role.create({
                data: {
                    name: data.name,
                },
            });
            return SuccessResponse(role, 'Role created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create role');
        }
    }

    async update(id: number, data: { name: string }): Promise<any> {
        const role = await this.prismaService.role.findUnique({ where: { id } });
        if (!role) {
            return NotFoundResponse('Role not found');
        }
        try {
            const updated = await this.prismaService.role.update({ where: { id }, data });
            return SuccessResponse(updated, 'Role updated successfully');
        } catch (error) {
            return BadRequestResponse('Failed to update role');
        }
    }

    async delete(id: number): Promise<any> {
        const role = await this.prismaService.role.findUnique({ where: { id } });
        if (!role) {
            return NotFoundResponse('Role not found');
        }
        try {
            await this.prismaService.role.delete({ where: { id } });
            return SuccessResponse('Role deleted successfully');
        } catch (error) {
            return BadRequestResponse('Failed to delete role');
        }
    }
}
