import { Column } from 'typeorm';

export class AppCpf {

  @Column('varchar')
  cpf: string;

};