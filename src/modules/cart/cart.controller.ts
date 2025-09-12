import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart-items')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartItemDto: any) {
    const cartItem = await this.cartService.create(createCartItemDto);
    return {
      success: true,
      message: 'Cart item created successfully',
      data: cartItem,
    };
  }

  @Get()
  async findAll() {
    const cartItems = await this.cartService.findAll();
    return {
      success: true,
      message: 'Cart items retrieved successfully',
      data: cartItems,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cartItem = await this.cartService.findById(id);
    return {
      success: true,
      message: 'Cart item retrieved successfully',
      data: cartItem,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartItemDto: any,
  ) {
    const cartItem = await this.cartService.update(id, updateCartItemDto);
    return {
      success: true,
      message: 'Cart item updated successfully',
      data: cartItem,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.cartService.remove(id);
    return {
      success: true,
      message: 'Cart item deleted successfully',
    };
  }
}
