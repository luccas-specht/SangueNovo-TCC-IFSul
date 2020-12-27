import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm';

@Entity('tb_user')
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
    
  @UpdateDateColumn()
  updated_at: Date;
};
