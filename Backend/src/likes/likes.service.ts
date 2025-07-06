import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikedBook } from '../database/entities/like.entity';
import { User } from '../database/entities/user.entity';
import { Book } from '../database/entities/book.entity';
import { BookQueryDto } from '../common/validator/books.query.validator';

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

  async getLikedBooks(
    userId: string,
    query: BookQueryDto = {} as BookQueryDto,
  ) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const qb = this.BookRepository.createQueryBuilder('book')
      .innerJoin('book.likes', 'likedBook', 'likedBook.user.id = :userId', {
        userId,
      })
      .leftJoinAndSelect('book.categories', 'category')
      .leftJoinAndSelect('book.comments', 'comment');

    if (query.published !== undefined) {
      qb.andWhere('book.published = :published', {
        published: query.published,
      });
    }

    if (query.price !== undefined) {
      qb.andWhere('book.price = :price', { price: query.price });
    }

    if (query.author?.length) {
      qb.andWhere(
        query.author
          .map((_, i) => `book.author ILIKE :author${i}`)
          .join(' OR '),
        query.author.reduce(
          (params, author, i) => {
            params[`author${i}`] = `%${author}%`;
            return params;
          },
          {} as Record<string, string>,
        ),
      );
    }

    if (query.cover) {
      qb.andWhere('book.cover = :cover', { cover: query.cover });
    }

    if (query.title) {
      qb.andWhere('book.title ILIKE :title', { title: `%${query.title}%` });
    }

    if (query.search) {
      qb.andWhere('book.title ILIKE :search', { search: `%${query.search}%` });
    }

    if (query.gift !== undefined) {
      qb.andWhere('book.gift = :gift', { gift: query.gift });
    }

    if (query.id) {
      qb.andWhere('book.id = :id', { id: query.id });
    }

    if (query.categories) {
      const categoryIds = Array.isArray(query.categories)
        ? query.categories
        : [query.categories];

      qb.andWhere('category.id IN (:...categoryIds)', { categoryIds });
    }

    if (query.sort) {
      qb.orderBy(
        `book.${query.sort}`,
        (query.order ?? 'ASC') as 'ASC' | 'DESC',
      );
    }

    qb.skip((page - 1) * limit).take(limit);

    const [entities, total] = await qb.getManyAndCount();

    return {
      page,
      pages: Math.ceil(total / limit),
      countItems: total,
      entities,
    };
  }

  async getLikesCount(bookId: string) {
    const book = await this.BookRepository.findOneOrFail({
      where: { id: bookId },
    });
    return { count: book.likesCount };
  }
}
