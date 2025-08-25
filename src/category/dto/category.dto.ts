import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty({ example: 'category name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'category description' })
    @IsNotEmpty()
    description: string;
}

export class UpdateCategoryDto {
    @ApiProperty({ example: 'category name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'category description' })
    @IsNotEmpty()
    description: string;
}