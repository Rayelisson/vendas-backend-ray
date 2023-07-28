/* eslint-disable prettier/prettier */

import { IsNumber } from "class-validator";


export class InsertCartDTO {
  @IsNumber()
  productId: number

  @IsNumber()
  amount: number

}