import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrl: './delete-task-dialog.component.scss',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, CommonModule]
})
export class DeleteTaskDialogComponent {
  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm() {
    this.taskService.deleteTask(this.data.taskId).subscribe(() => this.dialogRef.close(true))
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}