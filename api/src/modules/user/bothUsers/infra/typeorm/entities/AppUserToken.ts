import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn,
    UpdateDateColumn,
    Generated
} from 'typeorm';
  
@Entity('tb_user_token')
export class AppUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  @Generated('uuid')
  token_id: string;
  
  @Column()
  @Generated('uuid')
  user_id: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
};
  