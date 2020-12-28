import { Entity, Column } from 'typeorm';

import { AppUser } from './AppUser';
  
@Entity('tb_institution')
export class AppInstitution extends AppUser {
  @Column({
    type: 'varchar', 
    name: 'razao_social'
  })
  razaoSocial: string;

  @Column('varchar')
  cnpj: string;
};