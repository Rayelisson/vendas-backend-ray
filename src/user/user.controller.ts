/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatesUserDto } from './dtos/createsUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserType } from './enum/user-type.enum';
import { UserId } from '../decorators/user-id.decoratotor';
import { Roles } from '../decorators/role.decorator';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreatesUserDto): Promise<UserEntity> {
   return this.userService.createUser(createUser);
   }

   @Roles(UserType.Admin)
   @Get('/all')
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

  @Patch()
  @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    async updatePasswordUser(
        @Body() updatePasswordDTO: UpdatePasswordDTO,
        @UserId() userId: number
    ): Promise<UserEntity> {
       return this.userService.updatePasswordUser(updatePasswordDTO, userId)
    }

    @Roles(UserType.Admin, UserType.User)
    @Get()
    async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
      return new ReturnUserDto(
        await  this.userService.getUserByIdUsingRelations(userId),
        )
    }
  

}
