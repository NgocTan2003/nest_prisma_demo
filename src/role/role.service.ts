import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from '../common/response';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async create(data: { name: string }): Promise<any> {
        try {
            const role = this.roleRepository.create({ name: data.name });
            await this.roleRepository.save(role);
            return SuccessResponse(role, 'Role created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to create role');
        }
    }

    async update(id: number, data: { name: string }): Promise<any> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            return NotFoundResponse('Role not found');
        }
        try {
            await this.roleRepository.update(id, data);
            const updated = await this.roleRepository.findOne({ where: { id } });
            if (!updated) {
                return BadRequestResponse('Failed to update role');
            }
            return SuccessResponse(updated, 'Role updated successfully');
        } catch (error) {
            return BadRequestResponse('Failed to update role');
        }
    }

    async delete(id: number): Promise<any> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            return NotFoundResponse('Role not found');
        }
        try {
            await this.roleRepository.delete(id);
            return SuccessResponse('Role deleted successfully');
        } catch (error) {
            return BadRequestResponse('Failed to delete role');
        }
    }

    async findRoleById(id: number): Promise<Role | undefined> {
        const role = await this.roleRepository.findOne({ where: { id } });
        return role || undefined;
    }
}
