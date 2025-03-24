import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class CategoryDto {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsNotEmpty()
  gift: boolean;

  @IsEnum(['soft', 'firm'])
  @IsNotEmpty()
  cover: 'soft' | 'firm';

  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  categories: string[];
}
