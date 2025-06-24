import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

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
  @IsOptional()
  gift?: boolean;

  @IsEnum(['soft', 'firm'])
  @IsOptional()
  cover?: 'soft' | 'firm';

  @IsUUID('4', { each: true })
  @IsOptional()
  categories?: string[];
}

export class UpdatePublishedDto {
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
