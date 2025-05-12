import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
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
  ) {}

  async create(Dto: CreateBasketDto, userId: string) {
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
      relations: ['items', 'items.book'],
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

  async getUserBasket(userId: string) {
    const basket = await this.basketRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.book'],
    });

    if (!basket) throw new NotFoundException('Basket not found');
    return basket;
  }

  async remove(id: string, userId: string) {
    const basket = await this.getUserBasket(userId);
    const item = basket.items.find((item) => item.book.id === id);

    if (!item) throw new NotFoundException('Book not in basket');

    basket.items = basket.items.filter((i) => i.book.id !== id);
    await this.basketItemRepository.remove(item);
    return this.basketRepository.save(basket);
  }

  async clear(userId: string) {
    const basket = await this.getUserBasket(userId);
    await this.basketItemRepository.remove(basket.items);
    basket.items = [];
    return this.basketRepository.save(basket);
  }
}
