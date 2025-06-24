import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SupabaseService } from '../database/supabase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../database/entities/book.entity';
import { Category } from '../database/entities/category.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: `bearer`,
    }),
    TypeOrmModule.forFeature([Book, Category]),
  ],
  controllers: [BooksController],
  providers: [BooksService, SupabaseService],
})
export class BooksModule {}
