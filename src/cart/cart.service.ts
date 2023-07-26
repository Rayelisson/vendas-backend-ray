/* eslint-disable prettier/prettier */


import { Injectable } from '@nestjs/common';
import { CartEntity } from './entity/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {

        constructor(
             @InjectRepository(CartEntity)
             private readonly cartRepository: Repository<CartEntity>,
        ) {}
}
