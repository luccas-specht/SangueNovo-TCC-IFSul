import { Entity, Column } from 'typeorm';

import { AppUser } from './AppUser';
import { AppCnpj } from './AppCnpj';
@Entity('tb_institution')
export class AppInstitution extends AppUser {

  @Column('varchar')
  razao_social: string;

  @Column('varchar')
  cnpj: string;

};