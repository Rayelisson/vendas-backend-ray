/* eslint-disable prettier/prettier */


import { Injectable, NotFoundException } from '@nestjs/common';
import { CartEntity } from './entity/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UpdateCartDTO } from './dtos/update-create.dto';

const LINE_AFFECTED = 1

@Injectable()
export class CartService {

        constructor(
             @InjectRepository(CartEntity)
             private readonly cartRepository: Repository<CartEntity>,
             private readonly cartProductService: CartProductService
        ) {} 

        async clearCart(userId: number): Promise<DeleteResult> {
           const cart = this.findCartByUserId(userId)
             await this.cartRepository.save({
               ...cart,
               active: false,
            })

            return {
              raw: [],
              affected: LINE_AFFECTED,
            }
        } 

        async findCartByUserId(
          userId: number,
          isRelations?: boolean
          ): Promise<CartEntity> {
            const relations = isRelations
              ? {
               cartProduct: {
                 product: true,
               }
              }

              : undefined

              const cart = await this.cartRepository.findOne({
                where: {
                     userId,
                     active: true,
               },
               relations,
             })
     
               if (!cart) {
                 throw new NotFoundException('Cart active not found')
              }
     
               return cart
             }


    async createCart(userId: number): Promise<CartEntity>{
        return this.cartRepository.save({
          userId,
          active: true,
          
         })
   }

   async insertProductIncart(
     insertCart: InsertCartDTO,
     userId: number,
   ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
         return this.createCart(userId)
       })

       await this.cartProductService.insertProductInCart(insertCart, cart)

       return cart
   }

   async deleteProductCart(
        productId: number,
        userId: number,
    ): Promise<DeleteResult> {
       const cart = await this.findCartByUserId(userId)

       return this.cartProductService.deleteProductCart(productId, cart.id)
     }

     async updateProductInCart(
        updateCartDTO: UpdateCartDTO,
        userId: number,
      ): Promise<CartEntity> {
        
        const cart = await this.findCartByUserId(userId).catch(async () => {
           return this.createCart(userId)
        })

        await this.cartProductService.insertProductInCart(updateCartDTO, cart)

        return cart
      
      }
}
