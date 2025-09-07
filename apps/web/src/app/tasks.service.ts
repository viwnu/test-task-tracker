import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddTaskDto, ITask, IUpdateTaskDto } from '@app/contracts';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly baseUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl);
  }

  add(dto: IAddTaskDto): Observable<ITask> {
    return this.http.post<ITask>(this.baseUrl, dto);
  }

  updateTask(id: string, patch: IUpdateTaskDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, patch);
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
