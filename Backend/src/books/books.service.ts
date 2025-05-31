import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto, UpdatePublishedDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../database/entities/book.entity';
import { In, Repository } from 'typeorm';
import { SupabaseService } from '../database/supabase.service';
import { ConfigService } from '@nestjs/config';
import { Category } from '../database/entities/category.entity';
import { BookQueryDto } from '../common/validator/books.query.validator';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  async create(Dto: CreateBookDto) {
    const categories = await this.categoryRepository.find({
      where: { id: In(Dto.categories) },
    });

    if (categories.length !== Dto.categories.length) {
      throw new BadRequestException('Some categories were not found');
    }

    const book = await this.bookRepository.create({
      ...Dto,
      categories: categories,
    });
    this.bookRepository.save(book);
    return 'Creat book successfully';
  }

  async uploadFile(file: Express.Multer.File) {
    const supabase = this.supabaseService.getClient();
    const bucketName = this.configService.get<string>(
      'config.supabase.bucketBook',
    )!;

    const safeFileName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(safeFileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException('Failed to download file');
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(safeFileName);

    return { data: { publicUrl: data.publicUrl } };
  }

  async update(id: string, Dto: UpdateBookDto) {
    const book = await this.findOne(id);

    if (Dto.categories) {
      const categories = await this.categoryRepository.find({
        where: { id: In(Dto.categories) },
      });

      book.categories = categories;
    }

    if (Dto.title) book.title = Dto.title;
    if (Dto.price) book.price = Dto.price;
    if (Dto.description) book.description = Dto.description;
    if (Dto.author) book.author = Dto.author;
    if (Dto.gift !== undefined) book.gift = Dto.gift;
    if (Dto.cover) book.cover = Dto.cover;

    await this.bookRepository.save(book);
    return 'Book updated successfully';
  }

  async published(id: string, Dto: UpdatePublishedDto) {
    const book = await this.findOne(id);

    book.published = Dto.published;
    await this.bookRepository.save(book);
    return `Book published successfully`;
  }

  async findAll(query: BookQueryDto = {} as BookQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const qb = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.categories', 'category')
      .leftJoinAndSelect('book.comments', 'comment')
      .where('book.published = :published', {
        published: query.published ?? true,
      });

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

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['categories'],
    });

    if (!book) {
      throw new UnauthorizedException('Book not found');
    }

    return book;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.bookRepository.delete(id);
    return 'Book successfully deleted';
  }
}
