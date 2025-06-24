import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  book_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
