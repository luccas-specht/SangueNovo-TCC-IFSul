import { Entity, Column} from 'typeorm';

import { AppUser } from './AppUser';
  
  @Entity('tb_donator')
  export class AppDonator extends AppUser {
    @Column('varchar')
    name: string;
  
    @Column('date')
    birthday: Date;

    @Column('varchar')
    cpf: string;
  
    @Column('varchar')
    avatar: string;
};