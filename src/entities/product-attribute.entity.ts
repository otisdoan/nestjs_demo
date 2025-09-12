import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @Column({ type: 'varchar', length: 100, name: 'attribute_name' })
  attributeName: string;

  @Column({ type: 'varchar', length: 500, name: 'attribute_value' })
  attributeValue: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'attribute_group',
    nullable: true,
  })
  attributeGroup: string;

  @Column({ type: 'integer', name: 'sort_order', default: 0 })
  sortOrder: number;

  // Relations
  @ManyToOne(() => Product, (product) => product.attributes)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
