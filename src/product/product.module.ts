/* eslint-disable prettier/prettier */

import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { CarreiosModule } from 'src/carreios/carreios.module';

@Module({
  imports: [
  CarreiosModule,
  TypeOrmModule.forFeature([ProductEntity]),
  forwardRef(() => CategoryModule),
],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
