import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginDto, PasswordDto,
  ResetDto,
  TokenDto,
} from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from '../database/supabase.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { EmailService } from '../email/email.service';
import { EmailTypeEnum } from '../common/enums/email-type.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
  ) {}

  async signUpUser(dto: CreateUserDto): Promise<TokenDto> {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email and password are mandatory');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const token = await this.CreatingToken(user.id, user.email);
    await this.storeTokenInRedis(user.id, token.accessToken);
    await this.storeRefreshTokenInRedis(user.id, token.refreshToken);

    await this.emailService.sendEmail(EmailTypeEnum.WELCOME, user.email, {
      name: user.firstName || 'користувачу',
      frontUrl:
        this.configService.get<string>('config.front.frontUrl') ??
        'http://localhost:3000',
      imageUrl: user.image,
    });
    return token;
  }

  async uploadFile(file: Express.Multer.File) {
    const supabase = this.supabaseService.getClient();
    const bucketName = this.configService.get<string>(
      'config.supabase.bucket',
    )!;

    const safeFileName = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(safeFileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException('Failed to download file');
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(safeFileName);

    return { data: { publicUrl: data.publicUrl } };
  }

  async CreatingToken(userID: string, userEmail: string): Promise<TokenDto> {
    const accessToken = this.jwtService.sign(
      { id: userID, email: userEmail },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { id: userID, email: userEmail },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  private async storeTokenInRedis(
    UserId: string,
    token: string,
  ): Promise<void> {
    const redisUserKey = this.configService.get<string>('config.redis.userKey');
    const redisUserTime = this.configService.get<number>(
      'config.redis.userTime',
    );

    await this.redisService.set(
      `${redisUserKey}-${UserId}`,
      token,
      redisUserTime,
    );
  }

  private async storeRefreshTokenInRedis(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const redisRefreshKey = this.configService.get<string>(
      'config.redis.refreshKey',
    );
    const redisRefreshTime = this.configService.get<number>(
      'config.redis.refreshTime',
    );

    await this.redisService.set(
      `${redisRefreshKey}-${userId}`,
      refreshToken,
      redisRefreshTime,
    );
  }

  async validateUser(userId: string, userEmail: string): Promise<User> {
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

  async signInUser(Dto: LoginDto): Promise<TokenDto> {
    if (!Dto.email || !Dto.password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userRepository.findOne({
      where: { email: Dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(Dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.CreatingToken(user.id, user.email);
    await this.storeTokenInRedis(user.id, token.accessToken);
    await this.storeRefreshTokenInRedis(user.id, token.refreshToken);

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

    let decodedAccessToken;
    try {
      decodedAccessToken = this.jwtService.verify(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    const userId = decodedAccessToken.id;

    const redisRefreshKey = this.configService.get<string>(
      'config.redis.refreshKey',
    );
    const refreshToken = await this.redisService.get(
      `${redisRefreshKey}-${userId}`,
    );

    await this.removeTokenFromRedis(userId, accessToken);
    await this.removeRefreshTokenFromRedis(userId, refreshToken || undefined);

    return { message: 'User logged out successfully' };
  }

  private async removeTokenFromRedis(userId: string, token?: string) {
    const redisUserKey = this.configService.get<string>('config.redis.userKey');
    const redisBlacklistKey = this.configService.get<string>(
      'config.redis.blacklistKey',
    );

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
        if (expiresIn > 0) {
          await this.redisService.set(
            `${redisBlacklistKey}-access-${token}`,
            'blacklisted',
            expiresIn,
          );
        }
      } catch (error) {
        console.warn('Invalid access token:', error.message);
      }
    }

    await this.redisService.del(`${redisUserKey}-${userId}`);
  }

  private async removeRefreshTokenFromRedis(userId: string, token?: string) {
    const redisRefreshKey = this.configService.get<string>(
      'config.redis.refreshKey',
    );
    const redisBlacklistKey = this.configService.get<string>(
      'config.redis.black-token',
    );

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
        if (expiresIn > 0) {
          await this.redisService.set(
            `${redisBlacklistKey}-refresh-${token}`,
            'blacklisted',
            expiresIn,
          );
        }
      } catch (error) {
        console.warn('Invalid refresh token:', error.message);
      }
    }

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
    const redisRefreshKey = this.configService.get<string>(
      'config.redis.refreshKey',
    );
    const storedToken = await this.redisService.get(
      `${redisRefreshKey}-${userId}`,
    );

    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    await this.removeRefreshTokenFromRedis(userId, refreshToken);

    const tokens = await this.CreatingToken(decoded.id, decoded.email);
    await this.storeRefreshTokenInRedis(userId, tokens.refreshToken);
    await this.storeTokenInRedis(userId, tokens.accessToken);

    return tokens;
  }

  async resetPassword(dto: ResetDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newPassword = this.generateRandomPassword();
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(
      { email: dto.email },
      { password: hashed },
    );
    await this.emailService.sendEmail(
      EmailTypeEnum.FORGOT_PASSWORD,
      user.email,
      {
        name: user.firstName || 'користувачу',
        frontUrl:
          this.configService.get<string>('config.front.frontUrl') ??
          'http://localhost:3000',
        password: newPassword,
        imageUrl: user.image,
      },
    );

    return { message: 'new password sent' };
  }

  private generateRandomPassword(length: number = 10): string {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{};:,.<>?';
    const allChars =
      uppercaseChars + lowercaseChars + digitChars + specialChars;

    const randomUpper =
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    const randomLower =
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    const randomDigit =
      digitChars[Math.floor(Math.random() * digitChars.length)];
    const randomSpecial =
      specialChars[Math.floor(Math.random() * specialChars.length)];

    let password = randomUpper + randomLower + randomDigit + randomSpecial;

    for (let i = password.length; i < length; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      password += randomChar;
    }

    return this.shuffleString(password);
  }

  private shuffleString(str: string): string {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  async passwordUpdate(dto: PasswordDto, authHeader: string) {
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    let decodedAccessToken;
    try {
      decodedAccessToken = this.jwtService.verify(accessToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    const userId = decodedAccessToken.id;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.lostPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.update(userId, { password: hashedPassword });

    return { message: 'Password updated successfully' };
  }
}
