import { BaseEntity } from './base.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { BasketItem } from './basket.item.entity';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.basket, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => BasketItem, (item) => item.basket, { cascade: true })
  items: BasketItem[];
}
