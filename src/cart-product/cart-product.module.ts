import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductEntity } from './entity/cart-producdt.entity';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), ProductModule],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
