import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductReview } from './product-review.entity';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import slugify from 'slugify';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sku: string;

  @Column({ type: 'bigint', name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ type: 'bigint', name: 'brand_id', nullable: true })
  brandId: number;

  @Column({ type: 'text', name: 'short_description', nullable: true })
  shortDescription: string;

  @Column({ type: 'text', name: 'full_description', nullable: true })
  fullDescription: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'sale_price',
    nullable: true,
  })
  salePrice: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'cost_price',
    nullable: true,
  })
  costPrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dimensions: string;

  @Column({ type: 'integer', name: 'warranty_period', default: 12 })
  warrantyPeriod: number;

  @Column({ type: 'boolean', name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
    nullable: true,
  })
  status: ProductStatus;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    name: 'rating_average',
    default: 0,
  })
  ratingAverage: number;

  @Column({ type: 'integer', name: 'rating_count', default: 0 })
  ratingCount: number;

  @Column({ type: 'varchar', length: 255, name: 'meta_title', nullable: true })
  metaTitle: string;

  @Column({ type: 'text', name: 'meta_description', nullable: true })
  metaDescription: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductAttribute, (attribute) => attribute.product)
  attributes: ProductAttribute[];

  @OneToMany(() => ProductReview, (review) => review.product)
  reviews: ProductReview[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      this.slug = slugify(this.name, {
        lower: true,
        strict: true,
        locale: 'vi',
      });
    }
  }
}
