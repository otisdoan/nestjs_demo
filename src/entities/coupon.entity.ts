import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
}

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  value: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'min_order_amount',
    default: 0,
  })
  minOrderAmount: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'max_discount_amount',
    default: 0,
  })
  maxDiscountAmount: number;

  @Column({ type: 'integer', name: 'usage_limit', nullable: true })
  usageLimit: number;

  @Column({ type: 'integer', name: 'used_count', default: 0 })
  usedCount: number;

  @Column({ type: 'integer', name: 'user_usage_limit', default: 1 })
  userUsageLimit: number;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
