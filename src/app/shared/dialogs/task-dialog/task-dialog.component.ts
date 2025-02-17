import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, ReactiveFormsModule, CommonModule, MatInputModule]
})
export class TaskDialogComponent implements OnInit {
  tareaForm = new FormGroup({
    Titulo: new FormControl('', [Validators.required]),
    Descripcion: new FormControl('', [Validators.required, Validators.maxLength(300)])
  });

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if(!!this.data && !!this.data.id){
      this.tareaForm.get('Titulo')?.setValue(this.data.Titulo)
      this.tareaForm.get('Descripcion')?.setValue(this.data.Descripcion)
    }
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      if(!this.data && !this.data?.id){
        this.createTask()
      }else{
        this.updateTask()
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  createTask() {
    this.taskService.addTask(this.tareaForm.value).subscribe(
      (res: any) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error("error", error);
      }
    )
  }

  updateTask() {
    let payload = {
      ...this.tareaForm.value,
      taskId: this.data.id
    }
    this.taskService.editTask(payload).subscribe(
      (res: any) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error("error", error);
      }
    )
  }
}