import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedBook } from '../database/entities/like.entity';
import { Book } from '../database/entities/book.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: `bearer`,
    }),
    TypeOrmModule.forFeature([LikedBook, Book]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
