import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  avatar: string;
}

export { Users };
