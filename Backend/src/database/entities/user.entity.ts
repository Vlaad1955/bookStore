import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column('text', { nullable: false })
  password: string;

  @Column('integer', { nullable: true })
  phone: number;

  @Column('integer', { nullable: true })
  age: number;

  @Column('text', {
    nullable: true,
    default:
      'https://ziqxesyaovpowhccmwiw.supabase.co/storage/v1/object/public/user-covers//Empty_avatar.jpg',
  })
  image: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: 'User' })
  role: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
