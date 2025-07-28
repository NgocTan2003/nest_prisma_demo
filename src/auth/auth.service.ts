import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { compare, hash } from 'bcrypt';
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from 'src/common/response';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(data: RegisterDto): Promise<any> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: data.email,
                }
            });
            if (user) {
                return BadRequestResponse('User already exists');
            }
            const hashPassword = await hash(data.password, 10);
            const res = await this.prismaService.user.create({
                data: { ...data, password: hashPassword, roleId: 2 }
            });
            if (!res) {
                return BadRequestResponse('Failed to create user');
            }
            const payload = { email: data.email, sub: res.id };
            const token = this.jwtService.sign(payload, {
                secret: process.env.MAIL_SECRETKEY,
                expiresIn: '15m',
            });

            await this.sendVerificationEmail(data.email, token);

            return SuccessResponse(res, 'User created successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to register');
        }
    }

    async login(data: LoginDto): Promise<any> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: data.email,
                }
            });
            if (!user || user === null) {
                return NotFoundResponse('User not found');
            }
            const verifyPassword = await compare(data.password, user.password);
            if (!verifyPassword) {
                return BadRequestResponse('Invalid password');
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
            return SuccessResponse({ accessToken: accessToken, refreshToken: refreshToken }, 'Login successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Failed to login');
        }
    }

    async refreshToken(refreshToken: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
            const user = await this.prismaService.user.findUnique({
                where: { id: payload.id },
            });
            if (!user) {
                return NotFoundResponse('User not found');
            }
            const newAccessToken = this.jwtService.sign(
                { id: user.id, email: user.email, name: user.name },
                {
                    secret: process.env.ACCESS_TOKEN_KEY,
                    expiresIn: '1h',
                }
            );
            const newRefreshToken = this.jwtService.sign(
                { id: user.id, email: user.email, name: user.name },
                {
                    secret: process.env.REFRESH_TOKEN_KEY,
                    expiresIn: '2h',
                }
            );
            return SuccessResponse({ accessToken: newAccessToken, refreshToken: newRefreshToken }, 'RefreshToken successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Invalid refresh token');
        }
    }

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    async sendMail(to: string, subject: string, html: string): Promise<boolean> {
        try {
            const info = await this.transporter.sendMail({
                from: `<${process.env.MAIL_USERNAME}>`,
                to,
                subject,
                html,
            });
            return !!info.accepted && info.accepted.length > 0;
        } catch (error) {
            return false;
        }
    }

    async sendVerificationEmail(to: string, token: string) {
        const verifyLink = `http://localhost:3000/auth/verify?token=${token}`;
        const html = `
            <h2>Confirm Email</h2>
            <p>Click the following link to confirm:</p>
            <a href="${verifyLink}">${verifyLink}</a>
            `;
        const sent = await this.sendMail(to, 'Verify account', html);
        if (!sent) {
            throw new Error('Gửi email xác thực thất bại!');
        }
    }

    async verifyEmail(token: string): Promise<any> {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.MAIL_SECRETKEY,
            });
            const user = await this.prismaService.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user) {
                return NotFoundResponse('User not found');
            }
            if (user.isVerified) {
                return BadRequestResponse('Email already verified');
            }
            await this.prismaService.user.update({
                where: { id: user.id },
                data: { isVerified: true },
            });
            return SuccessResponse('Email verified successfully');
        } catch (error) {
            return BadRequestResponse(error.message || 'Invalid or expired token');
        }
    }
}


