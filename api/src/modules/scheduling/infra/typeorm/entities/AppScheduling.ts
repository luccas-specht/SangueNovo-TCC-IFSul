import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { AppInstitution } from '@modules/user/institution/infra/typeorm/entities/AppInstitution';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';

@Entity('tb_scheduling')
export class AppScheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @ManyToOne(() => AppDonation, (appDonation) => appDonation.schedulings)
  donatiton: AppDonation;

  @ManyToOne(
    () => AppInstitution,
    (appInstitution) => appInstitution.schedulings
  )
  institution: AppDonation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
