/* eslint-disable prettier/prettier */

import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { ProductService } from 'src/product/product.service';
import { ReturnCategory } from './dtos/return-category.dto';
import { CountProduct } from 'src/product/dtos/count-product.dto';
import { UpdateCategory } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
    ) {}

    findAmountCategoryInProducts(
      category: CategoryEntity,
      countList: CountProduct[],
      ): number {
         const count = countList.find(
           (itemCount) => itemCount.category_id === category.id,
          )

          if (count) {
           return count.total
          }

          return 0
      }

    async findAllCategories(): Promise<ReturnCategory[]> {
     const categories = await this.categoryRepository.find()

     const count = await this.productService.contProductByCategoryId()

     if (!categories || categories.length === 0) {
       throw new NotFoundException('category empty')
    }
    
     return categories.map((category) => new ReturnCategory(category, this.findAmountCategoryInProducts(category, count)))
    }

    async findCategoryById(categoryId: number, isRelations?: boolean,): Promise<CategoryEntity> {
       const relations = isRelations ? {
         products: true,
        } : undefined
        const category = await this.categoryRepository.findOne({
         where: {
            id: categoryId,
           },
           relations,
        })
 
        if (!category) {
          throw new NotFoundException(`Category id: ${categoryId} not found`)
       }
 
       return category;
     }



    async findCategoryByName(name: string): Promise<CategoryEntity> {
       const category = await this.categoryRepository.findOne({
            where: { 
            name,
            }
      })

      if (!category) {
          throw new NotFoundException(`Category name ${name} not found`)
      }

      return category
    }

    async createCategory(
        createCategory: CreateCategory
    ): Promise<CategoryEntity> {
     const category = await this.findCategoryByName(createCategory.name).catch(
        () => undefined,
        )

        if (category) {
           throw new BadRequestException(
            `Categoria name ${createCategory.name} existe`
            )
         }

      return this.categoryRepository.save(createCategory)
    }

    async deleteCategory(categoryId: number): Promise<DeleteResult> {
      const category = await this.findCategoryById(categoryId)

      if (category.products?.length > 0) {
        throw new BadRequestException('Category with relations') 
       }
     return this.categoryRepository.delete({ id: categoryId})
    }

    async editCategory(categoryId: number, updateCategory: UpdateCategory ): Promise<CategoryEntity> {
      const category = await this.findCategoryById(categoryId)

      return this.categoryRepository.save({
      ...category,
      ...updateCategory,
      })
    }

}
