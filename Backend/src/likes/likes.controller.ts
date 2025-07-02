import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard())
  @Post(':bookId')
  likeBook(@Param('bookId') bookId: string, @User('id') userId: string) {
    return this.likesService.likeBook(userId, bookId);
  }

  @UseGuards(AuthGuard())
  @Delete(':bookId')
  unlikeBook(@Param('bookId') bookId: string, @User('id') userId: string) {
    return this.likesService.unlikeBook(userId, bookId);
  }

  @UseGuards(AuthGuard())
  @Get('/list')
  getLikedBooks(@User('id') userId: string) {
    return this.likesService.getLikedBooks(userId);
  }

  @Get('count/:bookId')
  getLikesCount(@Param('bookId') bookId: string) {
    return this.likesService.getLikesCount(bookId);
  }
}
