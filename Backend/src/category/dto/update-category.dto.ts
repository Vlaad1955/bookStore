import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Name category must not exceed 20 characters' })
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'parentId must be a valid UUID' })
  @ApiProperty({ required: false })
  parentId?: string;
}
