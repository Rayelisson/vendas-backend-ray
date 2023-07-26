/* eslint-disable prettier/prettier */

import { CategoryEntity } from '../entity/category.entity';


export class ReturnCategory {
  id: number
  name: string

  constructor(categoryEntity: CategoryEntity) {
     this.id = categoryEntity.id
     this.name = categoryEntity.name
   
  }
}