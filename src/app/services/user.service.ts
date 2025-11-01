import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  register(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(`${this.url}users/register`, user, { headers });
  }

  uploadImage(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this._http.post<any>(`${this.url}images/upload`, formData);
}


  login(user: User): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this._http.post<any>(`${this.url}users/login`, user, { headers });
}

saveSession(data: any): void {
  localStorage.setItem('token', data.token); // Guarda el token
  localStorage.setItem('user', JSON.stringify(data)); // Guarda todo el usuario
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getUser(): User | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

logout(): void {
  localStorage.clear();
}


  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}users/getAll`, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}users/delete/${id}`, { headers });
  }

  changePassword(id: number, recoveryPassword: RecoveryPassword): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}users/changePassword/${id}`, recoveryPassword, {
      headers,
    });
  }

  getOne(id: Number): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.get<any>(`${this.url}users/getOne/${id}`, { headers });
  }

  update(id: number, user: User): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.put<any>(`${this.url}users/edit/${id}`, user, { headers });
  }
  
}
