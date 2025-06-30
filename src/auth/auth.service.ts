import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'generated/prisma';
import { compare, hash } from 'bcrypt';
import { LoginResponse } from './dto/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    register = async (data: RegisterDto): Promise<User> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (user) {
            throw new HttpException({ message: 'User already exists' }, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await hash(data.password, 10);

        const res = await this.prismaService.user.create({
            data: { ...data, password: hashPassword }
        });

        if (!res) {
            throw new HttpException({ message: 'Failed to create user' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return res;
    }

    login = async (data: LoginDto): Promise<LoginResponse> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!user) {
            throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
        }

        const verifyPassword = compare(data.password, user.password);
        const payload = { id: user.id, email: user.email, name: user.name }
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: '2h',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}


