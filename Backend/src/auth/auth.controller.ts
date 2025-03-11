import { Controller, Post, Body, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() Dto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<any> {
    if (file) {
      const uploadResult = await this.authService.uploadFile(file);
      Dto.image = uploadResult?.data?.publicUrl || "https://ziqxesyaovpowhccmwiw.supabase.co/storage/v1/object/public/user-covers//Empty_avatar.jpg";
    }

    return this.authService.signUpUser(Dto);
  }
}

