export interface HelloResponse {
  message: string;
}

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export interface IUpdateTaskDto extends Partial<Pick<ITask, 'title' | 'completed'>> {}

export interface IAddTaskDto extends Pick<ITask, 'title'> {
  completed?: boolean;
}
