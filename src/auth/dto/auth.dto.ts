import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";


export type LoginResponse = {
    accessToken?: string;
    refreshToken?: string;
}

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phone: string;

    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    status: number;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

