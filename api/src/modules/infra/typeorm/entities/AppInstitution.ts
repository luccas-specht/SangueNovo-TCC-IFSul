import { Entity, Column} from 'typeorm';

import { AppUser } from './AppUser';
  
  @Entity('tb_institution')
  export class AppInstitution extends AppUser {
    @Column('varchar')
    razaoSocial: string;
  
    @Column('varchar')
    cnpj: string;
  
    @Column('varchar')
    avatar: string;
};