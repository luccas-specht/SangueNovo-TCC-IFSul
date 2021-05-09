import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';

@Entity('tb_user')
export class AppUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  phone: string;

  @OneToMany(() => AppCampaign, (appCampaign) => appCampaign.user)
  campaigns: AppCampaign[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
