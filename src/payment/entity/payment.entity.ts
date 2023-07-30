/* eslint-disable prettier/prettier */

import { OrderEntity } from 'src/order/entity/order.entity';
import { PaymentStatusEntity } from 'src/payment-status/entity/payment-status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'discount', nullable: false })
  discount: number;

  @Column({ name: 'final_price', nullable: false })
  finalPrice: number;

  @Column({ name: 'type', nullable: false })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => OrderEntity, (order) => order.payment)
  orders: OrderEntity[]

  @ManyToOne(() => PaymentStatusEntity, (payment) => payment.payments)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  paymentStatus?: PaymentStatusEntity;
}