import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../shared/dialogs/task-dialog/task-dialog.component';
import { TaskService } from '../../core/services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DeleteTaskDialogComponent } from '../../shared/dialogs/delete-task-dialog/delete-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, MatCheckbox, FormsModule, MatTableModule]
})
export class HomeComponent {
  loadingChangeState: boolean = false
  displayedColumns: string[] = ['Titulo', 'Descripcion', 'TareaCreada', 'Estado', 'actions'];
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.tasks$ = res.data
      },
      (error) => {
        console.error("error", error);
      }
    )
  }

  addTask() {

  }

  deleteTask(task: any) {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '350px',
      data: { taskId: task.id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks()
      }
    });
  }

  toggleCompleted(task: Task): void {
    this.loadingChangeState = true
    let payload = {
      taskIds: [task.id]
    }
    this.taskService.completeTask(payload).subscribe(
      (res: any) => {
        this.loadTasks()
        this.loadingChangeState = false
      },
      (error) => {
        console.error("error", error);
      }
    )
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '550px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks()
      }
    });
  }
}