import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../database/entities/news.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { SupabaseService } from '../database/supabase.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: `bearer`,
    }),
    TypeOrmModule.forFeature([News]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, SupabaseService],
})
export class NewsModule {}
