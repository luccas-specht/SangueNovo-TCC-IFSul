import { Column } from 'typeorm';

export class AppCnpj {

  @Column('varchar')
  Cnpj: string;

};