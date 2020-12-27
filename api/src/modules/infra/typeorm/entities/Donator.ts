import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';

  import { User } from './User'
  
  @Entity('tb_donator')
  export class Donator extends User {
    @Column('varchar')
    name: string;
  
    @Column('varchar')
    cpf: string;
  
    @Column({
      type: 'date'
    })
    birthday: Date;
  
    @Column('varchar')
    avatar: string;
  };
  