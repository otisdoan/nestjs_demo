import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, name: 'order_number' })
  orderNumber: string;

  @Column({ type: 'bigint', name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 255, name: 'guest_email', nullable: true })
  guestEmail: string;

  @Column({ type: 'varchar', length: 20, name: 'guest_phone', nullable: true })
  guestPhone: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    nullable: true,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    nullable: true,
    name: 'payment_status',
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'payment_method',
    nullable: true,
  })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'discount_amount',
    default: 0,
    nullable: true,
  })
  discountAmount: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'shipping_fee',
    default: 0,
    nullable: true,
  })
  shippingFee: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    name: 'tax_amount',
    default: 0,
    nullable: true,
  })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'varchar', length: 3, default: 'VND', nullable: true })
  currency: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
