/* eslint-disable prettier/prettier */

import { RetornStateDto } from "src/state/dtos/returnState.dto"
import { CityEntity } from "../entity/city.entity"


export class ReturnCityDto {
     name: string
     state?: RetornStateDto

     constructor(city: CityEntity) {
      this.name = city.name;
      this.state = city.state ? new RetornStateDto(city. state)  : undefined


    }
}