/* eslint-disable prettier/prettier */


import { ReturnUserDto } from "src/user/dtos/returnUser.dto"
import { OrderEntity } from "../entity/order.entity"
import { ReturnAddressDto } from "src/address/dtos/returnAddress.dto"
import { ReturnPaymentDTO } from "src/payment/dtos/return-payment.dto"
import { ReturnOrderProductDTO } from "src/order-product/dtos/return-order-product.dto"


export class ReturnOrderDTO {
  id: number;
  date: string;
  userId: number;
  addressId: number;
  paymentId: number;
  user?: ReturnUserDto;
  address?: ReturnAddressDto;
  payment?: ReturnPaymentDTO;
  ordersProduct?: ReturnOrderProductDTO[];
  amountProducts?: number;

  constructor(order?: OrderEntity) {
    this.id = order?.id;
    this.date = order?.date.toString();
    this.userId = order?.userId;
    this.addressId = order?.addressId;
    this.paymentId = order?.paymentId;
    this.user = order?.user ? new ReturnUserDto(order?.user) : undefined;
    this.address = order?.address
      ? new ReturnAddressDto(order?.address)
      : undefined;
    this.payment = order?.payment
      ? new ReturnPaymentDTO(order?.payment)
      : undefined;
  }
}