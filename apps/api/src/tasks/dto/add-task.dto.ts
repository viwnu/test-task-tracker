import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TaskEntity } from 'apps/api/db/entities';
import { IsBoolean, IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddTaskDto extends OmitType(TaskEntity, ['id']) implements AddTaskDto {
  @ApiProperty({ type: 'string', example: 'Develop test task app', description: 'The title of the task' })
  @IsDefined()
  @IsString()
  @MaxLength(40)
  title: string;
  @ApiProperty({ type: 'boolean', example: false, description: 'Task complete status', required: false })
  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
