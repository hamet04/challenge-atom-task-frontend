import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string | null;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:5001/listtaskchallenge/southamerica-east1/api/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string | null): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/find-user-email/${email}`).pipe(
      tap((response: any) => {
        if(!!response.uid){
          localStorage.setItem('uid', response.uid)
        }
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('uid')
  }

  getUid(): string | null {
    return localStorage.getItem('uid')
  }

  logout(): void {
    localStorage.removeItem('uid')
    this.router.navigate(['/login'])
  }
}
