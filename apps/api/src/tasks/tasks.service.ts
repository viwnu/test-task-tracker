import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'apps/api/db/entities';
import { AddTaskDto } from './dto/add-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>) {}

  async addTask(dto: AddTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save({ ...dto, completed: dto.completed ?? false });
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<void> {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) throw new NotFoundException('Task not founded');
    await this.taskRepository.save({ id, ...dto });
  }

  async deleteTask(id: string): Promise<void> {
    const deleteResult = await this.taskRepository.delete(id);
    if (!deleteResult.affected) throw new NotFoundException('Task not founded');
  }

  async getTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }
}
