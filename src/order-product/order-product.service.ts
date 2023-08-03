/* eslint-disable prettier/prettier */


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entity/order-product.entity';
import { In, Not, Repository } from 'typeorm';
import { ReturnGroupOrder } from './dtos/return-group-order.dto';

@Injectable()
export class OrderProductService {
   constructor(
     @InjectRepository(OrderProductEntity)
     private readonly orderProductRepository: Repository<OrderProductEntity>,
  ) {}

  async createOrderProduct(
    productId: number,
    orderId: number,
    price: number,
    amount: number,
    ): Promise<OrderProductEntity> {
      if (!price) {
         throw new NotFoundException()
      }
      return this.orderProductRepository.save({
        amount,
        orderId,
        price,
        productId,
    })
  }

  async findAmoudProductByOrderId(orderId: number[]): Promise<ReturnGroupOrder[]> {
    return this.orderProductRepository
    .createQueryBuilder('order_product')
    .select('order_product.order_id, COUNT(*) as total')
    .where('order_product.order_id IN (:...ids)', { ids: orderId })
    .groupBy('order_product.order_id')
    .getRawMany();
  }
}
