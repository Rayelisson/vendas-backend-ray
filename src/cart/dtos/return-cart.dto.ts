/* eslint-disable prettier/prettier */


import { ReturCartProductDTO } from "src/cart-product/dtos/return-cart-product.dto"
import { CartEntity } from "../entity/cart.entity"


export class ReturnCartDTO {
   id: number
   cartProduct?: ReturCartProductDTO[]

   constructor(cart: CartEntity) {
      this.id = cart.id
      this.cartProduct = cart.cartProduct
       ? cart.cartProduct.map(
         (cartProduct) => new ReturCartProductDTO(cartProduct),
        )
        : undefined
    }
}