import { IsEmail, IsOptional, Matches } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phone: string

    @IsOptional()
    name: string

    @IsOptional()
    status: number
}