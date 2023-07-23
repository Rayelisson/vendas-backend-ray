/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreatesUserDto): Promise<UserEntity> {
   return this.userService.createUser(createUser);
   }

   @Get()
   async getAllUser(): Promise<ReturnUserDto[]> {
      return (await this.userService.getAllUser()).map(
        (userEntity) => new ReturnUserDto(userEntity),
        )
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number):Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId),
      )
  }

}
