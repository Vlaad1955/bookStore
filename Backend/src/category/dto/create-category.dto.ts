import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
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

export class ReturnCategoryDto extends CreateCategoryDto {
  @ApiProperty()
  id: string;
}
