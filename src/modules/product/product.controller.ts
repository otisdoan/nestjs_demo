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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      success: true,
      message: 'Product created successfully',
      data: product,
    };
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  @Get('name')
  async findAllNames() {
    const products = await this.productService.findAllNames();
    return {
      success: true,
      message: 'Product names retrieved successfully',
      data: products,
    };
  }

  @Get(':id/detail')
  async findOneDetail(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findById(id);
    return {
      success: true,
      message: 'Product detail retrieved successfully',
      data: product,
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const product = await this.productService.findBySlug(slug);
    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return {
      success: true,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }
}
