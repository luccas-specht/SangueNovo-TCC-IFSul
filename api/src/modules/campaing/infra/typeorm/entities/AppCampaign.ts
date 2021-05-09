import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';
import { AppInstitution } from '@modules/user/institution/infra/typeorm/entities/AppInstitution';

import { TypeBlood } from './EnumTypeBlood';
import { Priority } from './EnumPriority';
@Entity('tb_campaign')
export class AppCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar: string;

  @Column({ type: 'timestamptz', default: new Date() })
  available_date: Date;

  @Column({ type: 'int' })
  goal: number;

  @Column({
    type: 'enum',
    enum: TypeBlood,
    default: TypeBlood.TYPE_A_POSITIVE,
  })
  typeBlood: TypeBlood;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LESS,
  })
  priority: Priority;

  @OneToOne(() => AppInstitution, (appInstitution) => appInstitution.campaign)
  institution: AppInstitution;

  @OneToMany(() => AppDonation, (appDonation) => appDonation.campaign)
  donations: AppCampaign[];

  @ManyToOne(() => AppUser, (appUser) => appUser.campaigns)
  user: AppUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
