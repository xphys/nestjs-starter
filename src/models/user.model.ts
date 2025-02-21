import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TextColumn, BooleanColumn } from '@common/decorator/db.decorator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @TextColumn()
  name: string;

  @TextColumn()
  email: string;

  @BooleanColumn()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}