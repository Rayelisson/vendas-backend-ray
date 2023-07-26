/* eslint-disable prettier/prettier */

import { CartEntity } from "../../cart/entity/cart.entity";
import { ProductEntity } from "../../product/entity/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'cart_product'})
export class CartProductEntity {
   @PrimaryGeneratedColumn('rowid')
   id: number

   @Column({name: 'cart_id', nullable: false })
   cartId: string

   @Column({name: 'product_id', nullable: false })
    productId: number

   @Column({name: 'amount', nullable: false })
   amount: number

   @CreateDateColumn({name: 'created_at'})
   createdAt: Date;

   @UpdateDateColumn({name: 'updated_at'})
   updatedAt: Date;

   @ManyToOne(
      () => ProductEntity,
      (productEntity: ProductEntity) => productEntity.cartProduct,
   )

   @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
   product?: ProductEntity

   @ManyToOne(() => CartEntity, (cartEntity) => cartEntity.cartProduct)
   @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
   cart?: CartEntity

}