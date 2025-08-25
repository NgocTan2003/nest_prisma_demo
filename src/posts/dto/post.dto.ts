import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"



export class CreatePostDto {
    @ApiProperty({ example: 'post title' })
    @IsNotEmpty()
    title: string

    @ApiProperty({ example: 'post summary' })
    @IsNotEmpty()
    summary: string

    @ApiProperty({ example: 'post content' })
    @IsNotEmpty()
    content: string

    @ApiProperty({ example: '1' })
    status: number

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    ownerId: number

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    categoryId: number
}

export class UpdatePostDto {
    @ApiProperty({ example: 'post title' })
    @IsNotEmpty()
    title: string

    @ApiProperty({ example: 'post summary' })
    @IsNotEmpty()
    summary: string

    @ApiProperty({ example: 'post content' })
    @IsNotEmpty()
    content: string

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    status: number

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    categoryId: number
}