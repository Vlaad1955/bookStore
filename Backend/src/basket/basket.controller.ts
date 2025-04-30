import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(AuthGuard())
  @Post('add')
  create(
    @Body() Dto: CreateBasketDto,
    @Headers('Authorization') authHeader: string,
  ) {
    return this.basketService.create(Dto, authHeader);
  }

  @UseGuards(AuthGuard())
  @Delete('remove/:id')
  remove(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    return this.basketService.remove(id, authHeader);
  }

  @UseGuards(AuthGuard())
  @Delete('clear')
  clear(@Headers('Authorization') authHeader: string) {
    return this.basketService.clear(authHeader);
  }

  @UseGuards(AuthGuard())
  @Get('find')
  findAll(@Headers('Authorization') authHeader: string) {
    return this.basketService.getUserBasket(authHeader);
  }
}
