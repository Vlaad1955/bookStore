import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CategoryQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiProperty({ required: false, default: 'ASC', enum: ['ASC', 'DESC'] })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  order = 'ASC';

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumberString()
  page: string;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumberString()
  limit: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id?: string;
}
