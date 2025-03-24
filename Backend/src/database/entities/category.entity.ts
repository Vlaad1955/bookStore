import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Book } from './book.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  name: string;

  @Column('text', { nullable: true })
  parentId: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
