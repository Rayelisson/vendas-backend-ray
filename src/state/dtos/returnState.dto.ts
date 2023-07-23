/* eslint-disable prettier/prettier */

import { StateEntity } from "../entity/state.entity";


export class RetornStateDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }


}