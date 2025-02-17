import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://127.0.0.1:5001/listtaskchallenge/southamerica-east1/api/api/task';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getAll`);
  }

  addTask(payload: any): Observable<Task> {
    payload.uid = this.authService.getUid()
    return this.http.post<Task>(`${this.apiUrl}/create`, payload);
  }

  editTask(payload: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${payload.taskId}`, payload);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${taskId}`);
  }

  completeTask(payload: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/complete`, payload);
  }
}