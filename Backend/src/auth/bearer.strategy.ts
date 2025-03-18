import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-http-bearer';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { AuthService } from './auth.service';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, `bearer`) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('config.jwt.strategyKey'),
    });
  }

  async validate(token: string) {
    try {
      const redisUserKey = this.configService.get<string>('config.redis.userKey')
      const decodedToken: any = this.jwtService.decode(token);

      const exists = await this.redisService.exists(
        `${redisUserKey}-${decodedToken.id}`,
      );
      if (!exists) {
        throw new UnauthorizedException('Token not found in Redis');
      }

      try {
        await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('config.jwt.strategyKey'),
        });
      } catch (e) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      const user = await this.authService.validateUser(
        decodedToken.id,
        decodedToken.email,
      );
      return user;
    } catch (e) {
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
