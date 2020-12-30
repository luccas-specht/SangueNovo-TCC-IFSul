import { Entity, Column } from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';
import { AppCnpj } from './AppCnpj';

@Entity('tb_institution')
export class AppInstitution extends AppUser {

  @Column({
     name: 'razao_social',
     type: 'varchar'
   })
  razaoSocial: string;

  @Column('varchar')
  cnpj: string;

};