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
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto, UpdatePublishedDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from '../database/entities/book.entity';
import { BookQueryDto } from '../common/validator/books.query.validator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/create-book')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() Dto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadResult = await this.booksService.uploadFile(file);
      console.log(uploadResult);
      Dto.image = uploadResult?.data?.publicUrl;
    }
    return this.booksService.create(Dto);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() Dto: UpdateBookDto) {
    return this.booksService.update(id, Dto);
  }

  @Put('/published/:id')
  async updatePublishedStatus(
    @Param('id') id: string,
    @Body() Dto: UpdatePublishedDto,
  ) {
    return await this.booksService.published(id, Dto);
  }

  @Get('/list')
  findAll(@Query() query: BookQueryDto) {
    return this.booksService.findAll(query);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.booksService.remove(id);
  }
}
