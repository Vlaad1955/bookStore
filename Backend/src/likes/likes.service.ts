import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikedBook } from '../database/entities/like.entity';
import { User } from '../database/entities/user.entity';
import { Book } from '../database/entities/book.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikedBook)
    private readonly likedBookRepository: Repository<LikedBook>,
    @InjectRepository(Book)
    private readonly BookRepository: Repository<Book>,
  ) {}

  async likeBook(userId: string, bookId: string) {
    const existing = await this.likedBookRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (existing) {
      return this.unlikeBook(userId, bookId);
    }

    const like = this.likedBookRepository.create({
      user: { id: userId } as User,
      book: { id: bookId } as Book,
    });

    await this.BookRepository.increment({ id: bookId }, 'likesCount', 1);

    return this.likedBookRepository.save(like);
  }

  async unlikeBook(userId: string, bookId: string) {
    const existing = await this.likedBookRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (!existing) {
      throw new NotFoundException('Like not found');
    }

    await this.BookRepository.decrement({ id: bookId }, 'likesCount', 1);

    return this.likedBookRepository.remove(existing);
  }

  async getLikedBooks(userId: string) {
    return this.likedBookRepository.find({
      where: { user: { id: userId } },
      relations: ['book'],
    });
  }

  async getLikesCount(bookId: string) {
    const book = await this.BookRepository.findOneOrFail({
      where: { id: bookId },
    });
    return { count: book.likesCount };
  }
}
