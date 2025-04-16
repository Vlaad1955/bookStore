import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Basket } from './basket.entity';
import { Book } from './book.entity';

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Basket, (basket) => basket.items, { onDelete: 'CASCADE' })
  basket: Basket;

  @ManyToOne(() => Book, { eager: true })
  book: Book;

  @Column({ type: 'integer', default: 1 })
  quantity: number;
}
