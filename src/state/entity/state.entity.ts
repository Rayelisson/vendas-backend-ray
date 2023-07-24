/* eslint-disable prettier/prettier */

import { CityEntity } from "src/city/entity/city.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'state'})
export class StateEntity {
   @PrimaryGeneratedColumn('rowid')
   id: number;

   @Column({name: 'name', nullable: false})
   name: string;

   @CreateDateColumn({name: 'created_at'})
   createdAt: Date;

   @UpdateDateColumn({name: 'updated_at'})
   updatedAt: Date;

   @Column({ name: 'uf', nullable: false })
   uf: string;

  
   @OneToMany(() => CityEntity, (city) => city.state)
   cities?: CityEntity[];
}