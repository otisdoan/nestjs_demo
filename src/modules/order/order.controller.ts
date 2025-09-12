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
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: any) {
    const order = await this.orderService.create(createOrderDto);
    return {
      success: true,
      message: 'Order created successfully',
      data: order,
    };
  }

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return {
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findById(id);
    return {
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: any,
  ) {
    const order = await this.orderService.update(id, updateOrderDto);
    return {
      success: true,
      message: 'Order updated successfully',
      data: order,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.remove(id);
    return {
      success: true,
      message: 'Order deleted successfully',
    };
  }
}
