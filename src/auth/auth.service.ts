import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'generated/prisma';
import { compare, hash } from 'bcrypt';
import { LoginResponse } from './dto/auth.dto';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from 'src/common/response';
import { ISuccessResponse } from 'src/common/interface';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    register = async (data: RegisterDto): Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (user) {
            BadRequestResponse('User already exists');
        }

        const hashPassword = await hash(data.password, 10);
        const res = await this.prismaService.user.create({
            data: { ...data, password: hashPassword }
        });

        if (!res) {
            BadRequestResponse('Failed to create user');
        }

        return SuccessResponse(res, 'User created successfully');
    }

    login = async (data: LoginDto): Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!user || user === null) {
            NotFoundResponse('User not found');
            return;
        }

        const verifyPassword = await compare(data.password, user.password);
        console.log("verifyPassword ",verifyPassword);
        if (!verifyPassword) {
            BadRequestResponse('Invalid password');
            return;
        }
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


