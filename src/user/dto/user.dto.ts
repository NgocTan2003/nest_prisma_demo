import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, Matches } from "class-validator"

export class UpdateUserDto {
    @ApiProperty({ example: '0376446966' })
    @IsOptional()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phone: string

    @ApiProperty({ example: 'JohnDoe' })
    @IsOptional()
    name: string

    @ApiProperty({ example: '1' })
    @IsOptional()
    status: number
}