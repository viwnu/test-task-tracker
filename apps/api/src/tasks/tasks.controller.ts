import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from '@app/api-doc';
import { ApiDocExceptions } from '@app/api-doc/reponses';
import { AddTaskDto, TaskView, UpdateTaskDto } from './dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiDoc({
    title: 'AddTask',
    response: { status: 201, description: 'Task was added' },
    exceptions: [ApiDocExceptions.badRequest],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async add(@Body() task: AddTaskDto): Promise<TaskView> {
    return await this.tasksService.addTask(task);
  }

  @ApiDoc({
    title: 'UpdateTask',
    response: { status: 201, description: 'Task was updated' },
    params: [{ name: 'taskId', type: 'string' }],
    exceptions: [ApiDocExceptions.badRequest, ApiDocExceptions.notFound],
  })
  @Patch(':taskId')
  async update(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() task: UpdateTaskDto) {
    return await this.tasksService.updateTask(taskId, task);
  }

  @ApiDoc({
    title: 'DeleteTask',
    response: { status: 201, description: 'Task was Deleted' },
    params: [{ name: 'taskId', type: 'string' }],
    exceptions: [ApiDocExceptions.badRequest, ApiDocExceptions.notFound],
  })
  @Delete(':taskId')
  async delete(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return await this.tasksService.deleteTask(taskId);
  }

  @ApiDoc({
    title: 'Get Tasks',
    response: { status: 200, type: [TaskView], description: 'Chat messages' },
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async get(): Promise<TaskView[]> {
    return await this.tasksService.getTasks();
  }
}
