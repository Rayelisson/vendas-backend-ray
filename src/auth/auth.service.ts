/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
   
    constructor(
        private readonly userService: UserService, private jwtService: JwtService
    ) {}


    async login(loginDto: LoginDto): Promise<ReturnLogin> {
      const user: UserEntity | undefined =  await this.userService.findUserByEmail(loginDto.email).catch(() => undefined)

      const isMatch = await validatePassword(loginDto.password, user?.password || '',)

      if (!user || !isMatch) {
       throw new NotFoundException('Email ou password invalid')
     }
     return {
       accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
       user: new ReturnUserDto(user),
    }

  }

}
