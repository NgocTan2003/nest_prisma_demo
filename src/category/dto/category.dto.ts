import { IsNotEmpty } from "class-validator";


export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}

export class UpdateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}