/* eslint-disable prettier/prettier */


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entity/cart-producdt.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from '../cart/entity/cart.entity';
import { InsertCartDTO } from 'src/cart/dtos/insert-cart.dto';
import { ProductService } from 'src/product/product.service';
import { UpdateCartDTO } from 'src/cart/dtos/update-create.dto';

@Injectable()
export class CartProductService {
  constructor(
     @InjectRepository(CartProductEntity)
      private readonly cartProductRepository: Repository<CartProductEntity>,
      private readonly productService: ProductService,
    ) {}

    async verifyProductCart(productId: number, cartId: number): Promise<CartProductEntity> {
      const cartProduct = await this.cartProductRepository.findOne({
        where: {
         productId,
         cartId,
        },
     })

     if(!cartProduct){
       throw new NotFoundException('procud not found in cart')
    }
        return cartProduct
    }

    async createProProductInCart(insertCartDto: InsertCartDTO, cartId: number): Promise<CartProductEntity> {
        return this.cartProductRepository.save({
         amount: insertCartDto.amount,
         productId: insertCartDto.productId,
          cartId,
        })
    }

    async insertProductInCart(
        insertCartDto: InsertCartDTO, 
        cart: CartEntity,
    ): Promise<CartProductEntity> {
      await this.productService.findProductById(insertCartDto.productId)



      const cartProduct = await this.verifyProductCart(insertCartDto.productId, cart.id).catch(() => undefined)

      if (!cartProduct) {
         return this.createProProductInCart(insertCartDto, cart.id)
      }

      return this.cartProductRepository.save({
        ...cartProduct,
        amount: cartProduct.amount + insertCartDto.amount
      })

     }

     async updateProductInCart(
      updateCartDTO: UpdateCartDTO, 
      cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(updateCartDTO.productId)



    const cartProduct = await this.verifyProductCart(
      updateCartDTO.productId, 
      cart.id,
      )

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCartDTO.amount,
    })
  }

     async deleteProductCart(
      productId: number,
      cartId: number,
      ): Promise<DeleteResult> {
       return this.cartProductRepository.delete({ productId, cartId})
      }

}
