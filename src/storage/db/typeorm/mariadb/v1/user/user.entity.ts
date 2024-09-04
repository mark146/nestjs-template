import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  username: string;

  @Column()
  password: string;
}