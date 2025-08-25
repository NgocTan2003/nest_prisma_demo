import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard';
import { UserRoles } from 'src/util/role';
import { CurrrentUser } from './decorators/current-user.decorator';

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

    @Post('register-admin')
    @Roles(UserRoles.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    registerAdmin(@Body() body: RegisterDto): Promise<any> {
        return this.authService.registerAdmin(body);
    }

    @Post('refresh-token')
    refreshToken(@Body('refreshToken') body: RefreshTokenDto): Promise<any> {
        return this.authService.refreshToken(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrrentUser() user: any): Promise<any> {
        return user;
    }

}
