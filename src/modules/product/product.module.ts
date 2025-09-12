import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../../entities/product.entity';
import { ProductImage } from '../../entities/product-image.entity';
import { ProductVariant } from '../../entities/product-variant.entity';
import { ProductAttribute } from '../../entities/product-attribute.entity';
import { ProductReview } from '../../entities/product-review.entity';
import { Category } from '../../entities/category.entity';
import { Brand } from '../../entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductVariant,
      ProductAttribute,
      ProductReview,
      Category,
      Brand,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
