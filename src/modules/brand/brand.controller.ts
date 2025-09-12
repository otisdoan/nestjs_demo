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
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: any) {
    const brand = await this.brandService.create(createBrandDto);
    return {
      success: true,
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Get()
  async findAll() {
    const brands = await this.brandService.findAll();
    return {
      success: true,
      message: 'Brands retrieved successfully',
      data: brands,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandService.findById(id);
    return {
      success: true,
      message: 'Brand retrieved successfully',
      data: brand,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: any,
  ) {
    const brand = await this.brandService.update(id, updateBrandDto);
    return {
      success: true,
      message: 'Brand updated successfully',
      data: brand,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.brandService.remove(id);
    return {
      success: true,
      message: 'Brand deleted successfully',
    };
  }
}
