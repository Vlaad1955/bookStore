import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @IsEnum(['general', 'promotion', 'event'])
  @IsNotEmpty()
  category: 'general' | 'promotion' | 'event';
}
