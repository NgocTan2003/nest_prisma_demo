import { IsEmail, IsOptional, Matches } from "class-validator"
import { User } from "generated/prisma"

export type UserDto = {
    message: string,
    user?: User
}

export type ResponseUpdateUser = {
    message: string,
}

export class UpdateUserDto {
    @IsOptional()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phone: string

    name: string

    status: number
}