import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';
import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';
import { AppScheduling } from '@modules/scheduling/infra/typeorm/entities/AppScheduling';
@Entity('tb_donation')
export class AppDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AppCampaign, (appCampaign) => appCampaign.donations)
  campaign: AppCampaign;

  @ManyToOne(() => AppDonator, (appDonator) => appDonator.donations)
  donator: AppDonator;

  @OneToMany(() => AppScheduling, (appScheduling) => appScheduling.donatiton)
  schedulings: AppScheduling[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
