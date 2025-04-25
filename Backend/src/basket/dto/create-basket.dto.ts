import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketDto {
  @IsString()
  @ApiProperty({ description: 'ID книжки' })
  bookId: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Кількість (за замовчуванням 1)', default: 1 })
  quantity?: number;
}
