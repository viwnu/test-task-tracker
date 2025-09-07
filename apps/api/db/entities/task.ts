import { Task } from '@app/contracts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 40 })
  title: string;

  @Column('bool')
  completed: boolean;
}
