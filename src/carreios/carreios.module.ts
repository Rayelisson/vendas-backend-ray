/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CarreiosService } from './carreios.service';
import { CarreiosController } from './carreios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      }),
      CityModule,
  ],
  providers: [CarreiosService],
  controllers: [CarreiosController],
})
export class CarreiosModule {}
