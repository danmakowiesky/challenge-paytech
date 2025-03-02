import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Index('IDX_team_name', ['name'])
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @CreateDateColumn()
  createdAt: Date; // Data de cadastro

  @UpdateDateColumn()
  updatedAt: Date; // Data de atualização
}
