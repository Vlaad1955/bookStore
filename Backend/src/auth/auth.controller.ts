import {Controller, Post, Body, UseInterceptors, UploadedFile, UnauthorizedException, Headers} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto, LoginDto, TokenDto} from './dto/create-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() Dto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<TokenDto> {

    if (file) {
      const uploadResult = await this.authService.uploadFile(file);
      Dto.image = uploadResult?.data?.publicUrl || "https://ziqxesyaovpowhccmwiw.supabase.co/storage/v1/object/public/user-covers//Empty_avatar.jpg";
    }

    return this.authService.signUpUser(Dto);
  }

  @Post(`/login`)
  async singInUser(@Body() Dto: LoginDto): Promise<TokenDto> {
    return this.authService.signInUser(Dto);
  }

  @Post(`/logout`)
  async logOutUser(
      @Headers() headers: Record<string, string>) :Promise<{message:string}> {
    const authHeader = headers['authorization'];

    if (!authHeader){
      throw new UnauthorizedException('Authorization token is missing');
    }

    return this.authService.logOutUser(authHeader);
  }

  @Post(`/refresh`)
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<TokenDto> {
    return this.authService.refreshToken(refreshToken);
  }
}

