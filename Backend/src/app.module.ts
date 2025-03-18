import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import config from "./common/configuration/config";

@Module({
  imports: [AuthModule, DatabaseModule, CategoryModule, ConfigModule.forRoot({
    isGlobal:true,
    load:[config]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
