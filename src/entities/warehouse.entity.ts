import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'manager_name',
    nullable: true,
  })
  managerName: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  // Relations
  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventories: Inventory[];
}
