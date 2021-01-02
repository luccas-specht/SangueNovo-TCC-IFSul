import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm';

@Entity('tb_user')
export class AppUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    unique: true, 
    type: 'varchar'
 })
  email: string;

  @Column('varchar')
  password: string;

  @Column({ 
    type:'varchar',
    nullable: true 
   })
  avatar: string;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
    
  @UpdateDateColumn()
  updated_at: Date;
};