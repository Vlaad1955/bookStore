import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import * as path from 'path';
import * as process from 'process';
import {Category} from "./entities/category.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const postgresUrl = this.configService.get<string>('DATABASE_URL'); // Використовуємо змінну середовища для URL
        return {
            type: 'postgres',
            url: postgresUrl,
            entities: [User, Category],
            migrations: [
                path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
            ],
            synchronize: true,
        };
    }
}