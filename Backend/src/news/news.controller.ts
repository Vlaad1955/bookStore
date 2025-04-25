import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsQueryDto } from '../common/validator/news.query.validator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() Dto: CreateNewsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadResult = await this.newsService.uploadFile(file);
      Dto.image = uploadResult?.data?.publicUrl;
    }
    return this.newsService.create(Dto);
  }

  @Get('/list')
  findAll(@Query() query: NewsQueryDto) {
    return this.newsService.findAll(query);
  }

  @Get('find/id/:id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() Dto: UpdateNewsDto) {
    return this.newsService.update(id, Dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
