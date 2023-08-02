/* eslint-disable prettier/prettier */


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entity/order-product.entity';
import { In, Not, Repository } from 'typeorm';

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

  async findAmoudProductByOrderId(orderId: number[]): Promise<number> {
    const amount = await this.orderProductRepository.count({
      where: {
         id:In(orderId),
      },
    })
    return amount
  }
}
