import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  text: string;

  @ManyToOne(() => Book, (book) => book.comments, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
