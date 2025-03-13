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

  async signUpUser(dto: CreateUserDto): Promise<TokenDto> {
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
    await this.storeTokenInRedis(user.id, token.accessToken);
    await this.storeRefreshTokenInRedis(user.id, token.refreshToken)

    return token;
  }

  async uploadFile(file: Express.Multer.File) {
    const supabase = this.supabaseService.getClient();
    const bucketName = this.configService.get<string>('SUPABASE_BUCKET') || 'default-bucket-name';

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

  async CreatingToken(userID: string, userEmail: string) : Promise<TokenDto>{
    const accessToken = this.jwtService.sign(
        { id: userID, email: userEmail },
        { expiresIn: '15m' }
    );

    const refreshToken = this.jwtService.sign(
        { id: userID, email: userEmail },
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  private async storeTokenInRedis(UserId:string, token:string): Promise<void>{
    const redisUserKey = process.env['REDIS_USER_KEY'] || 'user-token';
    const redisUserTime = process.env['REDIS_USER_TIME']
        ? parseInt(process.env['REDIS_USER_TIME'], 10): 3600;

    await this.redisService.set(
        `${redisUserKey}-${UserId}`,
        token,
        redisUserTime,
    );
  }

  private async storeRefreshTokenInRedis(userId: string, refreshToken: string): Promise<void> {
    const redisRefreshKey = process.env['REDIS_REFRESH_KEY'] || 'refresh-token';
    const redisRefreshTime = process.env['REDIS_REFRESH_TIME']
        ? parseInt(process.env['REDIS_REFRESH_TIME'], 10) : 7 * 24 * 60 * 60;

    console.log('Storing refresh token with key:', `${redisRefreshKey}-${userId}`);
    console.log('Refresh token:', refreshToken);
    console.log('Expiration time:', redisRefreshTime);

    await this.redisService.set(`${redisRefreshKey}-${userId}`, refreshToken, redisRefreshTime);
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
    await this.storeTokenInRedis(user.id, token.accessToken);
    await this.storeRefreshTokenInRedis(user.id, token.refreshToken)

    return token;
  }

  async logOutUser(authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    // Верифікація access-токена
    let decodedAccessToken;
    try {
      decodedAccessToken = this.jwtService.verify(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    const userId = decodedAccessToken.id;

    // Отримання refresh токена з Redis
    const redisRefreshKey = process.env['REDIS_REFRESH_KEY'] || 'refresh-token';
    const refreshToken = await this.redisService.get(`${redisRefreshKey}-${userId}`);

    const redisBlacklistKey = process.env['REDIS_BLACKLIST_KEY'] || 'blacklist-token';

    // Додаємо access токен до чорного списку
    const accessExpiresIn = decodedAccessToken.exp - Math.floor(Date.now() / 1000);
    console.log(accessExpiresIn);
    if (accessExpiresIn > 0) {
      await this.redisService.set(`${redisBlacklistKey}-access-${accessToken}`, 'blacklisted', accessExpiresIn);
    }

    // Якщо refresh токен існує, додаємо його до чорного списку
    if (refreshToken) {
      try {
        const decodedRefreshToken = this.jwtService.verify(refreshToken);
        const refreshExpiresIn = decodedRefreshToken.exp - Math.floor(Date.now() / 1000);

        if (refreshExpiresIn > 0) {
          await this.redisService.set(`${redisBlacklistKey}-refresh-${refreshToken}`, 'blacklisted', refreshExpiresIn);
        }
      } catch (error) {
        console.warn('Invalid refresh token:', error.message);
      }
    }

    // Видалення токенів з Redis
    await this.removeTokenFromRedis(userId);
    await this.removeRefreshTokenFromRedis(userId);

    return { message: 'User logged out successfully' };
  }

  private async removeTokenFromRedis(userId: string){
    const redisUserKey = process.env['REDIS_USER_KEY'] || 'user-token'
    await this.redisService.del(`${redisUserKey}-${userId}`);
  }

  private async removeRefreshTokenFromRedis(userId: string) {
    const redisRefreshKey = process.env['REDIS_REFRESH_KEY'] || 'refresh-token';
    await this.redisService.del(`${redisRefreshKey}-${userId}`);
  }

  async refreshToken(refreshToken: string): Promise<TokenDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    let decoded;
    try {
      decoded = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = decoded.id;
    const redisRefreshKey = process.env['REDIS_REFRESH_KEY'] || 'refresh-token';
    const storedToken = await this.redisService.get(`${redisRefreshKey}-${userId}`);

    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const tokens = await this.CreatingToken(decoded.id, decoded.email);
    await this.storeRefreshTokenInRedis(userId, tokens.refreshToken);
    await this.storeTokenInRedis(userId, tokens.accessToken);

    return tokens;
  }
}

