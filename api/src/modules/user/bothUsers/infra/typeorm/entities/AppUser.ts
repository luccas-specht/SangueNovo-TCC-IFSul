import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class AppUser {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
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

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
    
  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
  
};