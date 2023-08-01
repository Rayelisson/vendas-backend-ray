/* eslint-disable prettier/prettier */
import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from 'src/order/dtos/create.order.dto';
import { PaymentCreditCardEntity } from './entity/payment-credit-card.entity';
import { PaymentPixEntity } from './entity/payment-pix.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { CartProductEntity } from '../cart-product/entity/cart-producdt.entity';
import { PaymentType } from './enums/payment-type.enum';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        ) {}

        generateFinalPrice(cart: CartEntity, products: ProductEntity[]) {
        if (!cart.cartProduct ||cart.cartProduct.length === 0) {
          return 0
        }

         return cart.cartProduct?.map(
            (cartProduct: CartProductEntity) => {
            const product = products.find(
                (product) => product.id === cartProduct.productId,
            )

            if (product) {
             return cartProduct.amount * product.price
            }

            return 0
        })

        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }

        async createPayment(
            createOrderDTO: CreateOrderDTO, 
            products: ProductEntity[], 
            cart: CartEntity,
            ): Promise<PaymentEntity> {
             const finalPrice = this.generateFinalPrice(cart, products)

            if (createOrderDTO.amountPayments) {
                const paymentCreditCard = new PaymentCreditCardEntity(
                       PaymentType.Done,
                       finalPrice,
                        0,
                        finalPrice,
                        createOrderDTO,
                    )
                    return this.paymentRepository.save(paymentCreditCard)
            } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
                    const pagamentPix = new PaymentPixEntity(
                        finalPrice,
                            0,
                            0,
                            finalPrice,
                            createOrderDTO,
                        )
                        return this.paymentRepository.save(pagamentPix)
            }

        throw new BadGatewayException(
            'Amount Payments or code pix or payment not fount'
            )

    }

}
