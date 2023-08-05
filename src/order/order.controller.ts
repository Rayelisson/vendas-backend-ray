/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create.order.dto';
import { OrderService } from './order.service';
import { UserId } from 'src/decorators/user-id.decoratotor';
import { OrderEntity } from './entity/order.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnOrderDTO } from './dtos/return-order.dto';

@Roles(UserType.Admin,  UserType.Root, UserType.User)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDTO: CreateOrderDTO,
        @UserId() userId: number,
        ) {
          return this.orderService.createOrder(createOrderDTO, userId)
        }

        @Get()
        async fincOrderByUserId(@UserId() userId: number): Promise<OrderEntity[]> {
          return this.orderService.fincOrderByUserId(userId)
        }

        @Roles(UserType.Admin,  UserType.Root)
        @Get('/all')
        async findAllOrders(): Promise<ReturnOrderDTO[]> {
          return (await this.orderService.findAllOrders()).map(
            (order) => new ReturnOrderDTO(order),
            )
        }

        @Roles(UserType.Admin,  UserType.Root)
        @Get('/orderId')
        async findOrderById(
          @Param('orderId') orderId: number, 
          ): Promise<ReturnOrderDTO> {
            return new ReturnOrderDTO(
               (await this.orderService.fincOrderByUserId(undefined, orderId))[0],
              )
          }

}
