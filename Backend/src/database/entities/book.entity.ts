import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  title: string;

  @Column('integer', { nullable: false })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  author: string;

  @Column('text', {
    nullable: true,
    default:
      'https://ziqxesyaovpowhccmwiw.supabase.co/storage/v1/object/public/book-covers//Empty_book.jpg',
  })
  image: string;

  @Column({ nullable: false, default: false })
  gift: boolean;

  @Column({ type: 'enum', enum: ['soft', 'firm'], nullable: false })
  cover: 'soft' | 'firm';

  @Column({ nullable: false, default: false })
  published: boolean;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({
    name: 'book_categories',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
