import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Basket } from '../database/entities/basket.entity';
import { BasketItem } from '../database/entities/basket.item.entity';
import { Book } from '../database/entities/book.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: `bearer`,
    }),
    TypeOrmModule.forFeature([User, Basket, BasketItem, Book]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
