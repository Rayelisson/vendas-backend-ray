/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
     @InjectRepository(UserEntity)
     private readonly userRepository: Repository<UserEntity>,
  ) {}

   async createUser(createUserDto: CreatesUserDto): Promise<UserEntity>{
    const saltOrRunds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRunds);

    return this.userRepository.save({
        ...createUserDto,
        typeUser: 1,
        password: passwordHashed,
    }) 
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
         where: {
             id: userId,
        },
         relations: {
            addresses: {
               city: {
                  state:true
               },
            },
          },
        })
  }


  async getAllUser(): Promise<UserEntity[]>{
     return this.userRepository.find()
   }

   async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
        where: {
           id: userId,
        }
    })

    if (!user) {
       throw new NotFoundException(`'UserId: ${userId} Not found'`)
    }

    return user
  }
 }
