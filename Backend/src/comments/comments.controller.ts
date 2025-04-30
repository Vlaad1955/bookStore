import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';
import { Comment } from '../database/entities/comment.entity';
import { CommentQueryDto } from '../common/validator/comment.query.validator';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard())
  @Post('/create-comment')
  create(
    @Body() Dto: CreateCommentDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<Comment> {
    return this.commentsService.create(Dto, authHeader);
  }

  @Get('/list')
  findAll(@Query() query: CommentQueryDto) {
    return this.commentsService.findAll(query);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() Dto: UpdateCommentDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<string> {
    return this.commentsService.update(id, Dto, authHeader);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<string> {
    return this.commentsService.remove(id, authHeader);
  }
}
