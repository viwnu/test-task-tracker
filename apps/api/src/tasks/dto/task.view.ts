import { AddTaskDto } from './add-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITask } from '@app/contracts';

export class TaskView extends AddTaskDto implements ITask {
  @ApiProperty({ type: 'string', example: '43139302-7f24-43da-a3e5-3aad633de159', description: 'Unique id of Task' })
  id: string;
}
