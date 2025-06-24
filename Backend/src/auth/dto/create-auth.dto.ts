import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ReturnUserDto {
  @IsOptional()
  @ApiProperty()
  id?: string;


  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  firstName?: string;


  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lastName?: string;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, type: Number })
  age?: number;

  @IsString()
  @ApiProperty()
  phone?: string;


  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image?: string;


export class CreateUserDto extends ReturnUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim().toLowerCase())
  @MaxLength(20, { message: 'Email must not exceed 20 characters' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    },
  )
  @ApiProperty({ required: true })
  password: string;
}

export class TokenDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim().toLowerCase())
  @MaxLength(20, { message: 'Email must not exceed 20 characters' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    },
  )
  @ApiProperty({ required: true })
  password: string;
}

export class ResetDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim().toLowerCase())
  @MaxLength(20, { message: 'Email must not exceed 20 characters' })
  email: string;
}

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  lostPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    },
  )
  @ApiProperty({ required: true })
  newPassword: string;
}
