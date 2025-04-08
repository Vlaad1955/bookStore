import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto, UpdatePublishedDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../database/entities/book.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
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
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!book) {
      throw new Error('Book not found');
    }

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
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    book.published = Dto.published;
    await this.bookRepository.save(book);
    return `Book published successfully`;
  }

  async findAll(query: BookQueryDto = {} as BookQueryDto) {
    const options = {
      page: Number(query.page ?? 1),
      limit: Number(query.limit ?? 10),
    };

    const filters: FindOptionsWhere<Book> = {};
    const order: any = {};

    if (query.price !== undefined) {
      filters.price = query.price;
    }
    if (query.author) {
      filters.author = Like(`%${query.author}%`);
    }
    if (query.cover) {
      filters.cover = query.cover;
    }
    if (query.title) {
      filters.title = Like(`%${query.title}%`);
    }
    if (query.gift !== undefined) {
      filters.gift = query.gift;
    }
    if (query.id) {
      filters.id = query.id;
    }

    if (query.search) {
      filters.title = Like(`%${query.search}%`);
    }

    filters.published = query.published ?? true;

    if (query.sort) {
      order[query.sort] = query.order ?? 'ASC';
    }

    const [entities, total] = await this.bookRepository.findAndCount({
      where: filters,
      relations: ['categories', 'comments'],
      order: order,
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    });

    return {
      page: options.page,
      pages: Math.ceil(total / options.limit),
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
    const book = await this.bookRepository.findOne({
      where: { id: id },
    });

    if (!book) {
      throw new UnauthorizedException('Book not found');
    }

    await this.bookRepository.delete(id);
    return { message: 'Book successfully deleted' };
  }
}
