import {BadRequestException, ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, LoginDto, TokenDto} from './dto/create-auth.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../database/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { SupabaseService } from "../database/supabase.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt'
import { RedisService } from '../redis/redis.service';
import * as process from "node:process";

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly supabaseService: SupabaseService,
      private readonly configService: ConfigService,
      private readonly jwtService: JwtService,
      private readonly redisService: RedisService,
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

    const token = await this.CreatingToken(user.id, user.email);
    await this.storeTokenInRedis(user.id, token);

    return { accessToken: token };
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

    const { data } = supabase.storage.from(bucketName).getPublicUrl(safeFileName);

    return { data: { publicUrl: data.publicUrl } };
  }

  async CreatingToken(userID: string, userEmail: string) : Promise<string>{
    return this.jwtService.sign({id: userID, email: userEmail});
  }

  private async storeTokenInRedis(UserId:string, token:string): Promise<void>{
    const redisUserKey = process.env['Redis_UserKey'] || 'user-token';
    const redisUserTime = process.env['Redis_UserTime']
        ? parseInt(process.env['Redis_UserTime'], 10): 3600;

    await this.redisService.set(
        `${redisUserKey}-${UserId}`,
        token,
        redisUserTime,
    );
  }

  async validateUser (userId: string, userEmail: string): Promise<User>{
    if (!userId || !userEmail) {
      throw new BadRequestException('User with this email already exist.');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId, email: userEmail },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }



  async signInUser (Dto: LoginDto): Promise<TokenDto>{
    if(!Dto.email || !Dto.password){
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userRepository.findOne({
      where: {email: Dto.email},
    })

    if (!user){
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
        Dto.password,
        user.password
    );

    if (!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.CreatingToken(user.id, user.email);
    await this.storeTokenInRedis(user.id, token);

    return {accessToken: token};
  }

  async logOutUser(authHeader: string){
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    const decodedToken = this.jwtService.verify(token);
    const userId = decodedToken.id;

    await this.removeTokenFromRedis(userId);

    return { message: 'User logged out successfully' };
  }

  private async removeTokenFromRedis(userId: string){
    const redisUserKey = process.env['Redis_UserKey'] || 'user-token'
    await this.redisService.del(`${redisUserKey}-${userId}`);
  }
}

