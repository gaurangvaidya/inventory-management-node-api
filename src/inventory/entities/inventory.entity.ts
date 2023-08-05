import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryCategory } from '../types';
import { randomUUID } from 'crypto';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'inventories' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: InventoryCategory,
  })
  category: InventoryCategory;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column()
  uuid: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
