import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from 'typeorm';

import { TypeBlood } from './EnumTypeBlood';
import { Priority } from './EnumPriority';

//TODO: ADD VALUE DATA AVAIBLE
//TODO: ADD FOREIGN KEY INSTITUTION AND USER

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
