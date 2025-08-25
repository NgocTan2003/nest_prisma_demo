import { IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, IsBoolean } from 'class-validator';
import { UserRoles } from 'src/util/role';

export class PageNumberDto {
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt() @Min(1) @Max(100) @IsOptional()
    limit: number = 1;

    @Transform(({ value }) => parseInt(value, 10))
    @IsInt() @Min(1) @IsOptional()
    page: number = 1;

    @IsString() @IsOptional()
    sortBy?: string;

    @IsOptional() @IsEnum(['asc', 'desc'] as any)
    sortOrder: 'asc' | 'desc' = 'desc';
}

export class UserFilterDto {
    @IsOptional() @IsString()
    q?: string;

    @IsOptional() @IsEnum([UserRoles.ADMIN, UserRoles.USER] as any)
    role?: UserRoles.ADMIN | UserRoles.USER;

    @IsOptional() @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isActive?: boolean;

    @IsOptional() @Type(() => Date)
    createdAt?: Date;

    @IsOptional() @Type(() => Date)
    updatedAt?: Date;
}

export class UserListQueryDto extends IntersectionType(
    PageNumberDto,
    UserFilterDto,
) { }