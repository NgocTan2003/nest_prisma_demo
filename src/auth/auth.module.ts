import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { RolesGuard } from 'src/guards/roles-guard';
import { UsersModule } from 'src/user/users.module';
import { RoleModule } from 'src/role/role.module';

@Module({
    imports: [UsersModule, RoleModule],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy, RolesGuard],
    exports: [AuthService, RolesGuard]
})
export class AuthModule { }
