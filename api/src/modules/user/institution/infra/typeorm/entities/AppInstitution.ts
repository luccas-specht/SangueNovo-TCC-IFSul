import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';

@Entity('tb_institution')
export class AppInstitution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  razao_social: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  cnpj: string;

  @OneToOne(() => AppUser)
  @JoinColumn({ name: 'tb_user_fk' })
  tb_user_fk: AppUser;
}
