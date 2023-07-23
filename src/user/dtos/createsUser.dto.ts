/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class CreatesUserDto {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;
    @IsString()
    cpf: string;

    @IsString()
    password: string;
}