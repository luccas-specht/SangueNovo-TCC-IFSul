import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';

@Entity('tb_donator')
export class AppDonator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToOne(() => AppUser)
  @JoinColumn({ name: 'tb_user_fk' })
  tb_user_fk: AppUser;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  date_last_donation: Date;

  @OneToMany(() => AppDonation, (appDonation) => appDonation.donator)
  donations: AppDonation[];
}
