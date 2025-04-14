import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersQueryDto } from '../common/validator/users.query.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private extractUserIdFromToken(authHeader: string): string | null {
    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = this.jwtService.verify(token);
      return String(decoded.id);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getUserIdFromAuthHeader(authHeader: string): Promise<string> {
    const userId = this.extractUserIdFromToken(authHeader);
    if (!userId) {
      throw new UnauthorizedException('User ID is missing from token');
    }
    return userId;
  }

  async findAll(query: UsersQueryDto = {} as UsersQueryDto) {
    const options = {
      page: Number(query.page ?? 1),
      limit: Number(query.limit ?? 10),
    };

    const filters: FindOptionsWhere<User> = {};
    const order: any = {};

    if (query.firstName) {
      filters.firstName = query.firstName;
    }

    if (query.lastName) {
      filters.lastName = query.lastName;
    }

    if (query.age) {
      filters.age = query.age;
    }

    if (query.phone) {
      filters.phone = query.phone;
    }

    if (query.email) {
      filters.email = query.email;
    }

    if (query.sort) {
      order[query.sort] = query.order ?? 'ASC';
    }

    const [entities, total] = await this.userRepository.findAndCount({
      where: filters,
      relations: ['comments'],
      order: order,
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    });

    return {
      page: options.page,
      pages: Math.ceil(total / options.limit),
      countItems: total,
      entities,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['comments'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, Dto: UpdateUserDto, authHeader: string) {
    const user = await this.findOne(id);

    const userId = await this.getUserIdFromAuthHeader(authHeader);

    if (user.id !== userId) {
      throw new UnauthorizedException('Only the user can update his account');
    }

    if (Dto.firstName) user.firstName = Dto.firstName;
    if (Dto.lastName) user.lastName = Dto.lastName;
    if (Dto.age) user.age = Dto.age;
    if (Dto.phone) user.phone = Dto.phone;

    await this.userRepository.save(user);

    return 'Account updated successfully';
  }

  async remove(id: string, authHeader: string) {
    const user = await this.findOne(id);

    const userId = await this.getUserIdFromAuthHeader(authHeader);

    if (user.id !== userId) {
      throw new UnauthorizedException('Only the user can delete his account');
    }

    await this.userRepository.delete(id);

    return 'Account successfully deleted';
  }
}
