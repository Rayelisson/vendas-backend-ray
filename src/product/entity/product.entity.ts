/* eslint-disable prettier/prettier */

import { CartProductEntity } from "src/cart-product/entity/cart-producdt.entity";
import { CategoryEntity } from "../../category/entity/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProductEntity } from "src/order-product/entity/order-product.entity";


@Entity({name: 'product'})
export class ProductEntity {
   @PrimaryGeneratedColumn('rowid')
   id: number

   @Column({name: 'name', nullable: false })
    name: string

    
   @Column({ name: 'category_id', nullable: false })
   categoryId: number;

   @Column({name: 'price',type: 'decimal', nullable: false })
    price: number

   @Column({name: 'image', nullable: false })
   image: string

   @Column({ name: 'weight', nullable: false })
   weight: number;
 
   @Column({ name: 'length', nullable: false })
   length: number;
 
   @Column({ name: 'height', nullable: false })
   height: number;
 
   @Column({ name: 'width', nullable: false })
   width: number;
 
   @Column({ name: 'diameter', nullable: false })
   diameter: number;

   @CreateDateColumn({name: 'created_at'})
   createdAt: Date;

   @UpdateDateColumn({name: 'updated_at'})
   updatedAt: Date;

   @OneToMany(() => CartProductEntity, (cartEntity) => cartEntity.product)
   cartProduct?: CartProductEntity[];

   @ManyToOne(
      () => CategoryEntity,
      (category: CategoryEntity) => category.products
    )

   @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
   category?: CategoryEntity 

   @OneToMany(() => OrderProductEntity, (ordersProduct) => ordersProduct.product)
   ordersProduct: OrderProductEntity[]


}