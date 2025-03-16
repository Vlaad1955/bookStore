import {ReturnUserDto} from "../../auth/dto/create-auth.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {Transform} from "class-transformer";


export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    @Transform(({ value }) => value.trim().toLowerCase().replace(/^\w/, c => c.toUpperCase()))
    @MaxLength(20, { message: 'Name category must not exceed 20 characters' })
    name:string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    parentId: string;
}

export class ReturnCategoryDto extends CreateCategoryDto {
    @ApiProperty()
    id: string;
}
