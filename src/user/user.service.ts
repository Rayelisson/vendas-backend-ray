/* eslint-disable prettier/prettier */

import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserType } from './enum/user-type.enum';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
     @InjectRepository(UserEntity)
     private readonly userRepository: Repository<UserEntity>,
  ) {}



   async createUser(createUserDto: CreatesUserDto): Promise<UserEntity>{
      const user = await this.findUserByEmail(createUserDto.email).catch(
         () => undefined,
       );
   
       if (user) {
         throw new BadGatewayException('email registered in system');
       }

       const passwordHashed = await createPasswordHashed(
         createUserDto.password
         )

    return this.userRepository.save({
        ...createUserDto,
        typeUser: UserType.User,
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
  async findUserByEmail(email: string): Promise<UserEntity> {
   const user = await this.userRepository.findOne({
       where: {
           email,
       }
   })

   if (!user) {
      throw new NotFoundException(`'UserId: ${email} Not found'`)
   }

   return user
 }


 async updatePasswordUser(
   updatePasswordDTO: UpdatePasswordDTO, 
     userId: number,
   ): Promise<UserEntity> {
     const user = await this.findUserById(userId)

     const passwordHasbed = await createPasswordHashed(
        updatePasswordDTO.newPassword,
      )

      const isMatch = await validatePassword(
          updatePasswordDTO.lastPassword,
          user.password || '',
         )

         if (!isMatch) {
            throw new BadRequestException('Last password invalid')
          }

      return this.userRepository.save({
        ...user,
        password: passwordHasbed,
      })
   }
 }
