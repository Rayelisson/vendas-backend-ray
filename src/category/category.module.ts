/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([CategoryEntity]),
  forwardRef(() => ProductModule),
],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
