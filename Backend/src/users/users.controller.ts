import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from '../common/validator/users.query.validator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/list')
  findAll(@Query() query: UsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Get('find')
  findOneToToken(@User('id') userId: string) {
    return this.usersService.findOneTo(userId);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() Dto: UpdateUserDto,
    @User('id') userId: string,
  ) {
    return this.usersService.update(id, Dto, userId);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(@Param('id') id: string, @User('id') userId: string) {
    return this.usersService.remove(id, userId);
  }
}
