import { Entity, 
         Column, 
         OneToOne, 
         PrimaryGeneratedColumn,
         JoinColumn } from 'typeorm';
      
import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';

@Entity('tb_donator')
export class AppDonator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;
  
  @Column('date')
  birthday: Date;

  @Column('varchar')
  cpf: string;

  @OneToOne(() => AppUser)
  @JoinColumn()
  tb_user_fk: AppUser;
};