/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-procut.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProduct[]> {
      return (await this.productService.findAll([], true)).map(
         (product) => new ReturnProduct(product)
        )
    }

    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto,
    ): Promise<ProductEntity> {
       return this.productService.createProduct(createProduct)
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Delete('/:productId')
    async deleteProduct(
        @Param('productId') productId: number
    ): Promise<DeleteResult> {
       return this.productService.deleteProduct(productId)
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(
        @Body() updateProduct: UpdateProductDTO,
        @Param('productId') productId: number
    ): Promise<ProductEntity> {
       return this.productService.updateProduct(updateProduct,productId)
    }
}
