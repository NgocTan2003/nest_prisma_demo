import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";


export type LoginResponse = {
    accessToken?: string;
    refreshToken?: string;
}

export class RegisterDto {
    @ApiProperty({ example: 'JohnDoe' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '0376556973' })
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phone: string;

    @ApiProperty({ example: 'JohnDoe@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'abc123' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({ example: '1' })
    status: number;
}

export class LoginDto {
    @ApiProperty({ example: 'JohnDoe@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'abc123'})
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'your-refresh-token' })
    @IsNotEmpty()
    refreshToken: string;
}

