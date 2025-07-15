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
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto, UpdatePublishedDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from '../database/entities/book.entity';
import { BookQueryDto } from '../common/validator/books.query.validator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator/roles.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles(`Admin`)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('/create-book')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() Dto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    if (file) {
      const uploadResult = await this.booksService.uploadFile(file);
      Dto.image = uploadResult?.data?.publicUrl;
    } else {
      Dto.image = `https://ziqxesyaovpowhccmwiw.supabase.co/storage/v1/object/public/book-covers//Empty_book.jpg`;
    }
    return this.booksService.create(Dto);
  }

  @Roles(`Admin`)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() Dto: UpdateBookDto): Promise<string> {
    return this.booksService.update(id, Dto);
  }

  @Roles(`Admin`)
  @UseGuards(AuthGuard(), RoleGuard)
  @Put('/published/:id')
  async updatePublishedStatus(
    @Param('id') id: string,
    @Body() Dto: UpdatePublishedDto,
  ): Promise<string> {
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

  @Roles(`Admin`)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<string> {
    return this.booksService.remove(id);
  }

  @Get('max-price')
  async getMaxPrice(@Query() query: BookQueryDto): Promise<{ maxPrice: number }> {
    const maxPrice = await this.booksService.getMaxPrice(query);
    return { maxPrice };
  }
}
