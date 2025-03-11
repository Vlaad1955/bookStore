import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../database/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { SupabaseService } from "../database/supabase.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly supabaseService: SupabaseService,
      private readonly configService: ConfigService,
  ) {}

  async signUpUser(dto: CreateUserDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email і пароль є обов\'язковими');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Користувач з таким email вже існує');
    }
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
        this.userRepository.create({ ...dto, password })
    );

    return user;
  }

  async uploadFile(file: Express.Multer.File) {
    const supabase = this.supabaseService.getClient(); // Ініціалізація клієнта
    const bucketName = this.configService.get<string>('SUPABASE_BUCKET') || 'default-bucket-name'; // Отримуємо ім'я бакету

    const safeFileName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(safeFileName, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

    if (error) {
      console.error('Supabase Error:', error.message);  // Додатковий лог для помилки
      throw new BadRequestException('Не вдалося завантажити файл');
    }

    // Формуємо publicURL
    const { data } = supabase.storage.from(bucketName).getPublicUrl(safeFileName);

    return { data: { publicUrl: data.publicUrl } };
  }
}

