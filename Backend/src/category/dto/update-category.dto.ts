import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @MaxLength(20, { message: 'Name category must not exceed 20 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  parentId: string;
}
