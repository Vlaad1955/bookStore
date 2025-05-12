import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ minLength: 10, maxLength: 20 })
  @Length(10, 20, { message: 'Title must be between 10 and 20 characters' })
  title: string;

  @Column('text')
  @ApiProperty({ minLength: 100, maxLength: 300 })
  @Length(100, 300, {
    message: 'Content must be between 100 and 300 characters',
  })
  content: string;

  @Column({
    type: 'enum',
    enum: ['general', 'promotion', 'event'],
    nullable: false,
  })
  category: 'general' | 'promotion' | 'event';

  @Column({ nullable: true })
  @IsOptional()
  @ApiProperty({ required: false })
  image?: string;
}
