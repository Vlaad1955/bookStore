import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { BasketModule } from './basket/basket.module';
import { NewsModule } from './news/news.module';

import config from './common/configuration/config';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    BooksModule,
    CommentsModule,
    UsersModule,
    BasketModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
