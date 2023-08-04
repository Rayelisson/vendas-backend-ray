/* eslint-disable prettier/prettier */


import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { Injectable, NotFoundException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDTO } from './dtos/update-procut.dto';
import { CountProduct } from './dtos/count-product.dto';
import { SizeProductDTO } from 'src/carreios/dto/size-product';
import { CarreiosService } from 'src/carreios/carreios.service';
import { CdServiceEnum } from 'src/carreios/enums/cd-service.enum';
import { ReturnPriceDeliveryDto } from './dtos/return-price-delivery.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,

        private readonly correiosService: CarreiosService
        
    ) {}

    async findAll(productId?: number[], isFindRelations?: boolean,): Promise<ProductEntity[]> {
      let findOpitions = {}

      if (productId && productId.length > 0) {
        findOpitions = {
         whire: {
           id: In(productId),
         },
        }
      }

      if (isFindRelations) {
        findOpitions = {
          ...findOpitions,
          relations: {
           category: true,
          },
        
        }
      }


      const products = await this.productRepository.find(findOpitions)

      if (!products || products.length === 0) {
        throw new NotFoundException('Not found product')
    }

     return products
    }


    async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
      await this.categoryService.findCategoryById(createProduct.categoryId)

      return this.productRepository.save({
         ...createProduct,
         weight: createProduct.weight || 0,
         width: createProduct.width || 0,
         length: createProduct.length || 0,
         diameter: createProduct.diameter || 0,
         height: createProduct.height || 0
     })
    }

    async findProductById(productId: number): Promise<ProductEntity> {
       const product = await this.productRepository.findOne({
          where: {
             id: productId,
            },
        })

        if (!product) {
            throw new NotFoundException(`Product id: ${productId} not found`)
          }
          return product
      }

    async deleteProduct(productId: number): Promise<DeleteResult> {
      await this.findProductById(productId)

        return this.productRepository.delete({id: productId})
    }
    
    async updateProduct(updateProduct: UpdateProductDTO, productId: number ): Promise<ProductEntity> {
      const product = await this.findProductById(productId)

      return this.productRepository.save({
         ...product,
         ...updateProduct,

      })
    }

    async contProductByCategoryId(): Promise<CountProduct[]> {
      return this.productRepository
       .createQueryBuilder('product')
       .select('product.category_id, COUNT(*) as total')
       .groupBy('product.category_id')
       .getRawMany()
    }

    async findPriceDelivery(cep: string, idProduct: number): Promise<any> {
       const product = await this.findProductById(idProduct)

       const sizeProduct = new SizeProductDTO(product)

       const resultPrice = await Promise.all([
        this.correiosService.findPriceDelivery(
          CdServiceEnum.PAC, 
          cep, 
          sizeProduct,
          ),

          this.correiosService.findPriceDelivery(
            CdServiceEnum.SEDEX, 
            cep, 
            sizeProduct,
            ),
            this.correiosService.findPriceDelivery(
              CdServiceEnum.SEDEX_10, 
              cep, 
              sizeProduct,
              ),
      ]).catch(() => {
         throw new BadRequestException('Error find delivery price')
      })

      return new ReturnPriceDeliveryDto(resultPrice)


       
       
    }
  }
