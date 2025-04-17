import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Book } from '../database/entities/book.entity';
import { Basket } from '../database/entities/basket.entity';
import { BasketItem } from '../database/entities/basket.item.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,

    @InjectRepository(BasketItem)
    private readonly basketItemRepository: Repository<BasketItem>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private extractUserIdFromToken(authHeader: string): string | null {
    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = this.jwtService.verify(token);
      return String(decoded.id);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getUserIdFromAuthHeader(authHeader: string): Promise<string> {
    const userId = this.extractUserIdFromToken(authHeader);
    if (!userId) {
      throw new UnauthorizedException('User ID is missing from token');
    }
    return userId;
  }

  async create(Dto: CreateBasketDto, authHeader: string) {
    const userId = await this.getUserIdFromAuthHeader(authHeader);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const book = await this.bookRepository.findOne({
      where: { id: Dto.bookId },
    });

    if (!book) throw new NotFoundException('Book not found');

    let basket = await this.basketRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.book'], // ➕ підвантажуємо звʼязані записи
    });

    if (!basket) {
      basket = this.basketRepository.create({ user, items: [] });
    }

    const existingItem = basket.items.find(
      (item) => item.book.id === Dto.bookId,
    );

    if (existingItem) {
      existingItem.quantity += Dto.quantity ?? 1;
    } else {
      const newItem = this.basketItemRepository.create({
        book,
        quantity: Dto.quantity ?? 1,
      });
      basket.items.push(newItem);
    }

    return this.basketRepository.save(basket);
  }

  async getUserBasket(authHeader: string) {
    const userId = await this.getUserIdFromAuthHeader(authHeader);

    const basket = await this.basketRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.book'],
    });

    if (!basket) throw new NotFoundException('Basket not found');
    return basket;
  }

  async remove(id: string, authHeader: string) {
    const basket = await this.getUserBasket(authHeader);
    const item = basket.items.find((item) => item.book.id === id);

    if (!item) throw new NotFoundException('Book not in basket');

    basket.items = basket.items.filter((i) => i.book.id !== id);
    await this.basketItemRepository.remove(item);
    return this.basketRepository.save(basket);
  }

  async clear(authHeader: string) {
    const basket = await this.getUserBasket(authHeader);
    await this.basketItemRepository.remove(basket.items);
    basket.items = [];
    return this.basketRepository.save(basket);
  }
}
