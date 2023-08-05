/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult } from 'typeorm';
import { UpdateProductDTO } from './dtos/update-procut.dto';
import { ReturnPriceDeliveryDto } from './dtos/return-price-delivery.dto';
import { Pagination } from 'src/dtos/pagination.dto';

@Roles(UserType.Admin,  UserType.Root, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin,  UserType.Root, UserType.User)
  @Get()
  async findAll(): Promise<ReturnProduct[]> {
      return (await this.productService.findAll([], true)).map(
         (product) => new ReturnProduct(product)
        )
    }

    @Roles(UserType.Admin,  UserType.Root, UserType.User)
    @Get('/page')
  async findAllPage(
       @Query('search') search:string,
       @Query('size') size?: number,
       @Query('page') page?: number,
       ): Promise<Pagination<ReturnProduct[]>> {
      return this.productService.findAllPage(search, size, page)
    }

    @Roles(UserType.Admin,UserType.Root ,UserType.User)
    @Get('/:productId')
    async findProductById(@Param('productId') productId): Promise<ReturnProduct> {
        return new ReturnProduct(
         await this.productService.findProductById(productId, true),
         )
      }

    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto,
    ): Promise<ProductEntity> {
       return this.productService.createProduct(createProduct)
    }

    @Roles(UserType.Admin,  UserType.Root)
    @UsePipes(ValidationPipe)
    @Delete('/:productId')
    async deleteProduct(
        @Param('productId') productId: number
    ): Promise<DeleteResult> {
       return this.productService.deleteProduct(productId)
    }

    @Roles(UserType.Admin,  UserType.Root)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(
        @Body() updateProduct: UpdateProductDTO,
        @Param('productId') productId: number
    ): Promise<ProductEntity> {
       return this.productService.updateProduct(updateProduct,productId)
    }

    @Get('/:idProduct/delivery/:cep')
    async findPriceDelivery(
        @Param('idProduct') idProduct: number,
        @Param('cep') cep: string,
        ): Promise<ReturnPriceDeliveryDto> {
      return this.productService.findPriceDelivery(cep, idProduct)
   }


}
