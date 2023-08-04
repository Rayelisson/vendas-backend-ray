/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CarreiosService } from './carreios.service';
import { CarreiosController } from './carreios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from 'src/city/city.module';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [
    SoapModule.register(
      { 
      clientName: 'SOAP_CORREIOS', 
      uri: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl', 
      },
    ),
    HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      }),
      CityModule,
  ],
  providers: [CarreiosService],
  controllers: [CarreiosController],
  exports: [CarreiosService],
})
export class CarreiosModule {}
