import { Injectable } from "@nestjs/common";
import { UnauthorziredResponse } from "src/common/response";
import { UsersService } from "src/user/users.service";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_KEY,
        });
    }

    async validate(payload: any) {
        try {
            const user = await this.userService.getById(payload.id);
            if (!user) {
                throw UnauthorziredResponse("User not found");
            }
            return {
                role: payload.role,
            }

        } catch (error) {
            throw UnauthorziredResponse("Invalid token");
        }
    }
}

