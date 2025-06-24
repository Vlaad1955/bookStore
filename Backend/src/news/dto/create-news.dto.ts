import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsEnum(['general', 'promotion', 'event'])
  @IsNotEmpty()
  category: 'general' | 'promotion' | 'event';

  @IsString()
  @IsOptional()
  image?: string;
}
