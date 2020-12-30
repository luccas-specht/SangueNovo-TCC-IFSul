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
  tokenId: string;
  
  @Column({
   name: 'userId'
  })
  @Generated('uuid')
  userId: string;
  
  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
  
  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
};
  