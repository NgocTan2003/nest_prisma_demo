import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'generated/prisma';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<LoginResponse> {
        return this.authService.login(body);
    }

}
