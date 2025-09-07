import { PartialType } from '@nestjs/swagger';
import { AddTaskDto } from './add-task.dto';
import { IUpdateTaskDto } from '@app/contracts';

export class UpdateTaskDto extends PartialType(AddTaskDto) implements IUpdateTaskDto {}
