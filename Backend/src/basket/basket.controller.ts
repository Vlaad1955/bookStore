import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('add')
  create(
    @Body() Dto: CreateBasketDto,
    @Headers('Authorization') authHeader: string,
  ) {
    return this.basketService.create(Dto, authHeader);
  }

  @Delete('remove/:id')
  remove(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    return this.basketService.remove(id, authHeader);
  }

  @Delete('clear')
  clear(@Headers('Authorization') authHeader: string) {
    return this.basketService.clear(authHeader);
  }

  @Get('find')
  findAll(@Headers('Authorization') authHeader: string) {
    return this.basketService.getUserBasket(authHeader);
  }
}
