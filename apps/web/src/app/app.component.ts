import { Component, computed, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TasksService } from './tasks.service';
import { ITask } from '@app/contracts';

@Component({
  selector: 'app-root',
  imports: [TableModule, InputTextModule, FormsModule, CheckboxModule, ButtonModule, DialogModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Задачи';
  loading = signal(true);
  tasks = signal<ITask[]>([]);
  addVisible = signal(false);
  newTitle = signal('');
  creating = signal(false);
  canCreate = computed(() => this.newTitle().trim().length > 0 && !this.creating());
  private deletingIds = signal<Set<string>>(new Set());

  constructor(private tasksApi: TasksService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.tasksApi.getTasks().subscribe({
      next: (list) => {
        // нормализуем completed
        this.tasks.set(list.map((t) => ({ ...t, completed: !!t.completed })));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  // чекбокс меняет completed → шлём PATCH /api/tasks/{id}
  onToggleCompleted(row: ITask, checked: boolean) {
    const prev = !!row.completed;

    // оптимистичное обновление UI
    row.completed = checked;
    this.tasks.set([...this.tasks()]);

    this.tasksApi.updateTask(row.id, { completed: checked }).subscribe({
      next: () => {},
      error: () => {
        // откатим состояние при ошибке
        row.completed = prev;
        this.tasks.set([...this.tasks()]);
        // здесь можно показать тост/алерт
        // alert('Не удалось обновить статус задачи');
      },
    });
  }

  isDeleting(id: string) {
    return this.deletingIds().has(id);
  }

  onDelete(row: ITask) {
    // фиксируем “удаляется”
    const set = new Set(this.deletingIds());
    set.add(row.id);
    this.deletingIds.set(set);

    // оптимистично убираем строку из таблицы
    const before = this.tasks();
    this.tasks.set(before.filter((t) => t.id !== row.id));

    this.tasksApi.deleteTask(row.id).subscribe({
      next: () => {
        const s = new Set(this.deletingIds());
        s.delete(row.id);
        this.deletingIds.set(s);
      },
      error: () => {
        // откат
        this.tasks.set(before);
        const s = new Set(this.deletingIds());
        s.delete(row.id);
        this.deletingIds.set(s);
        // тут можно показать тост/алерт
        // alert('Не удалось удалить задачу');
      },
    });
  }

  openAdd() {
    this.newTitle.set('');
    this.addVisible.set(true);
  }

  createTask() {
    const title = this.newTitle().trim();
    if (!title || this.creating()) return;

    this.creating.set(true);
    this.tasksApi.add({ title }).subscribe({
      next: (created) => {
        this.creating.set(false);
        this.addVisible.set(false);
        this.newTitle.set('');

        if (created && created.id) {
          // если бэкенд вернул созданную задачу — добавим локально
          const normalized: ITask = { ...created, completed: !!created.completed };
          this.tasks.set([normalized, ...this.tasks()]);
        } else {
          // если body пустой — просто перезагрузим список
          this.reload();
        }
      },
      error: () => {
        this.creating.set(false);
        // тут можно показать тост/сообщение об ошибке
      },
    });
  }

  trackById = (_: number, t: ITask) => t.id;
}
