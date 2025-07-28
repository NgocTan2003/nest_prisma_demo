import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiTags('auth')
    @Post('register')
    register(@Body() body: RegisterDto): Promise<any> {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<any> {
        return this.authService.login(body);
    }

    @Get('verify')
    verifyEmail(@Query('token') token: string): Promise<any> {
        return this.authService.verifyEmail(token);
    }
}
