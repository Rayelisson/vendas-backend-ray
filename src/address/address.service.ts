/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entity/address.entity';
import { Not, Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {

 constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService
) {}

 async createAddress(
     createAddressDto: CreateAddressDto, 
     userId: number,
): Promise<AddressEntity> {
    await this.userService.findUserById(userId)
    await this.cityService.findCityById(createAddressDto.cityId)
    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    })
}

async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
  const addresses = await this.addressRepository.find({
     where: {
        userId,
      },
  })

  if (!addresses) {
      throw new NotFoundException(`erro na verificacao ${userId}`)
  }

  return addresses
} 

}
