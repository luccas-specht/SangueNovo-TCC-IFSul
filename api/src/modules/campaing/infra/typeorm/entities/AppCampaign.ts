import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
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

  @Column({ type: 'timestamptz' })
  available_date: Date;

  @OneToMany(() => AppDonation, (appDonation) => appDonation)
  donations: AppDonation[];

  @OneToOne(() => AppInstitution)
  @JoinColumn()
  institution: AppInstitution;

  @OneToMany(() => AppUser, (appUser) => appUser)
  users: AppUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
