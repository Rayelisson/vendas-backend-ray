/* eslint-disable prettier/prettier */

import { Controller, Get, Param } from '@nestjs/common';
import { CarreiosService } from './carreios.service';
import { ReturnCep } from './dto/return-cep.dto';

@Controller('carreios')
export class CarreiosController {
   constructor( private readonly correiosService: CarreiosService) {}



   @Get('/:cep')
   async findAll(@Param('cep') cep: string): Promise<ReturnCep> {
     return this.correiosService.findAddressByCep(cep)
  }

}
