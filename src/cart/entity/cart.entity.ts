/* eslint-disable prettier/prettier */


import { CartProductEntity } from "../../cart-product/entity/cart-producdt.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'cart' })
export class CartEntity {
   @PrimaryGeneratedColumn('rowid')
   id: number

   @Column({ name: 'name', nullable: false })
   userId: number

   @CreateDateColumn({name: 'created_at'})
createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
    cartProduct?: CartProductEntity[]

}