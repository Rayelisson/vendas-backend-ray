/* eslint-disable prettier/prettier */
import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from 'src/order/dtos/create.order.dto';
import { PaymentCreditCardEntity } from './entity/payment-credit-card.entity';
import { PaymentPixEntity } from './entity/payment-pix.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
        ) {}

        async createPayment(createOrderDTO: CreateOrderDTO): Promise<PaymentEntity> {
        if (createOrderDTO.amountPayments) {
            const paymentCreditCard = new PaymentCreditCardEntity(
                    0,
                    0,
                    0,
                    0,
                    createOrderDTO,
                )
                return this.paymentRepository.save(paymentCreditCard)
         } else if (createOrderDTO.codePix && createOrderDTO.datePayment) {
                const pagamentPix = new PaymentPixEntity(
                        0,
                        0,
                        0,
                        0,
                        createOrderDTO,
                    )
                    return this.paymentRepository.save(pagamentPix)
        }

        throw new BadGatewayException(
            'Amount Payments or code pix or payment not fount'
            )

    }

}
