import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";
import {ConfigModule} from "@nestjs/config";
import {SupabaseService} from "../database/supabase.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseService],
})
export class AuthModule {}
