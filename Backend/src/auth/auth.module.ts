import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from '../database/supabase.service';
import { RedisModule } from '../redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    forwardRef(() => RedisModule),
    PassportModule.register({
      defaultStrategy: `bearer`,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_STRATEGY_KEY,
      signOptions: { expiresIn: `1d` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SupabaseService, BearerStrategy],
})
export class AuthModule {}
