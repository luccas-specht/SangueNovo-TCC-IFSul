import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';

//TODO: ADD FOREIGN KEY DONATION AND INSTITUTION

@Entity('tb_scheduling')
export class AppScheduling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
