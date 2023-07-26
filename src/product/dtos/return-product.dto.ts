/* eslint-disable prettier/prettier */

import { ProductEntity } from "../entity/product.entity"

export class ReturnProduct {
   id: number
   name: string
   price: number
   image: string

   constructor(productEntity: ProductEntity) {
    this.id = productEntity.id
    this.name = productEntity.name
    this.price = productEntity.price
    this.image = productEntity.image

  }

}