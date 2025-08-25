import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/user.dto';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from 'src/common/response';
import { UserListQueryDto } from 'src/common/pagination/dto/page-query.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getAll(query: UserListQueryDto): Promise<any> {
        const { page = 1, limit = 20, sortBy, sortOrder = 'desc', q, role, isActive } = query;
        const offset = (page - 1) * limit;

        const orderField = ['createdAt', 'updatedAt', 'email', 'name', 'role'].includes(sortBy ?? '')
            ? (sortBy as string)
            : 'createdAt';

        const where: any = {};
        if (q) {
            where.name = { $ilike: `%${q}%` };
            where.email = { $ilike: `%${q}%` };
        }
        if (typeof isActive === 'boolean') where.isActive = isActive;
        if (role) where.role = role;

        const [data, total] = await this.userRepository.findAndCount({
            where,
            order: { [orderField]: sortOrder.toUpperCase() },
            skip: offset,
            take: limit,
        });

        const totalPages = Math.max(1, Math.ceil(total / limit));

        return {
            data,
            meta: {
                total,
                page,
                totalPages,
                limit,
                sortBy: orderField,
                sortOrder,
                hasPrev: page > 1,
                hasNext: page < totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
            },
        };
    }

    async getById(id: number): Promise<any> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            NotFoundResponse('User not found');
            return;
        }

        const { password, ...userWithoutPassword } = user;
        return SuccessResponse(userWithoutPassword, 'Get Successfully');
    }

    async update(id: number, data: UpdateUserDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            NotFoundResponse('User not found');
        }

        await this.userRepository.update(id, data);

        return SuccessResponse('Updated Successfully');
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user || undefined;
    }

    async findOneById(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user || undefined;
    }

    async createUser(data: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(data);
        return this.userRepository.save(newUser);
    }

    async updateUser(id: number, data: Partial<User>): Promise<void> {
        await this.userRepository.update(id, data);
    }
}
