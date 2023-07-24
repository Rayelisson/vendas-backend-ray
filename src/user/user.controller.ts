/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';


@Controller('/user')
export class UserController {
  getInfoUser(id: number) {
    throw new Error('Method not implemented.');
  }
  updatePasswordUser(updatePasswordMock: UpdatePasswordDTO, id: number) {
    throw new Error('Method not implemented.');
  }
  createAdmin(createUserMock: CreatesUserDto) {
    throw new Error('Method not implemented.');
  }
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
