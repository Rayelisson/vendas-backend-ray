/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async createUser(@Body() createUser: CreatesUserDto): Promise<UserEntity> {
   return this.userService.createUser(createUser);
   }

   @Get()
   async getAllUser(): Promise<UserEntity[]> {
      return this.userService.getAllUser()
  }

}
