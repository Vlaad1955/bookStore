import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class BookQueryDto {
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

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ required: false, type: [String], isArray: true })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    let values: string[] = [];

    if (Array.isArray(value)) {
      values = value.flatMap((val) => val.split(','));
    } else if (typeof value === 'string') {
      values = value.split(',');
    }

    return values.map((v) => v.trim()).filter(Boolean);
  })
  @IsArray()
  @IsString({ each: true })
  author?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['soft', 'firm'])
  cover?: 'soft' | 'firm';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  gift?: boolean;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsUUID('all', { each: true })
  categories?: string[];
}
