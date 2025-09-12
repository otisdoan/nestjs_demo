import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('inventor')
export class Inventory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', name: 'warehouse_id' })
  warehouseId: number;

  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @Column({ type: 'bigint', name: 'variant_id', nullable: true })
  variantId: number;

  @Column({ type: 'integer', default: 0 })
  quantity: number;

  @Column({ type: 'integer', name: 'reserved_quantity', default: 0 })
  reservedQuantity: number;

  @Column({ type: 'integer', name: 'min_stock_alert', default: 10 })
  minStockAlert: number;

  @Column({
    type: 'timestamp',
    name: 'last_updated',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdated: Date;

  // Relations
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;
}
