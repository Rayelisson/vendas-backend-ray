/* eslint-disable prettier/prettier */

import { ReturnProduct } from 'src/product/dtos/return-product.dto';
import { CategoryEntity } from '../entity/category.entity';


export class ReturnCategory {
  id: number
  name: string
  amoutProducts?:number
  products?: ReturnProduct[];

  constructor(categoryEntity: CategoryEntity, amoutProducts?: number) {
     this.id = categoryEntity.id
     this.name = categoryEntity.name
     this.amoutProducts = amoutProducts
     this.products = categoryEntity.products
     ? categoryEntity.products.map((product) => new ReturnProduct(product))
     : undefined;
   
  }
}