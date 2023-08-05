/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entity/address.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decoratotor';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Controller('address')
export class AddressController {
  
    constructor(private readonly addressService: AddressService) {}

    @Roles(UserType.Admin,  UserType.Root)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number,
   ): Promise<AddressEntity> {
     return this.addressService.createAddress(createAddressDto, userId)

}

@Get()
async findAddressByUserId(
  @UserId() userId: number,
): Promise<ReturnAddressDto[]> {
  return (await this.addressService.findAddressByUserId(userId)).map(
    (address) => new ReturnAddressDto(address),
  );
}

}
