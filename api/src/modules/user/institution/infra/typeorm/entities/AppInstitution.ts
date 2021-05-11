import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';
import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';

@Entity('tb_institution')
export class AppInstitution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  razao_social: string;

  @Column('varchar')
  cep: string;

  @Column('varchar')
  latitude: string;

  @Column('varchar')
  longitude: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  cnpj: string;

  @OneToOne(() => AppUser)
  @JoinColumn({ name: 'tb_user_fk' })
  tb_user_fk: AppUser;

  @OneToMany(() => AppCampaign, (appCampaign) => appCampaign.institution)
  campaigns: AppCampaign[];
}
