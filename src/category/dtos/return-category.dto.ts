/* eslint-disable prettier/prettier */

import { CategoryEntity } from '../entity/category.entity';


export class ReturnCategory {
  id: number
  name: string
  amoutProducts?:number

  constructor(categoryEntity: CategoryEntity, amoutProducts?: number) {
     this.id = categoryEntity.id
     this.name = categoryEntity.name
     this.amoutProducts = amoutProducts
   
  }
}