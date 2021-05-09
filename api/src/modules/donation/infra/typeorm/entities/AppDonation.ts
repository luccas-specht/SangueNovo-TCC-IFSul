import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';
import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';

@Entity('tb_donation')
export class AppDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  appointment_date: Date;

  @ManyToOne(() => AppDonator, (appDonator) => appDonator.donations)
  donator: AppDonator;

  @ManyToOne(() => AppCampaign, (appCampaign) => appCampaign.donations)
  campaign: AppCampaign;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
