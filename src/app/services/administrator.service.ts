import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';

@Injectable()
export class AdministratorService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(administrator: Administrator): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}administrators/register`, administrator, { headers });
    }

  login(administrator: Administrator): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this._http.post<any>(`${this.url}administrators/login`, administrator, { headers });
}

saveSession(data: any): void {
  localStorage.setItem('token', data.token); // Guarda el token
  localStorage.setItem('administrator', JSON.stringify(data)); // Guarda todo el usuario
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getAdministrator(): Administrator | null {
  const administrator = localStorage.getItem('administrator');
  return administrator ? JSON.parse(administrator) : null;
}

logout(): void {
  localStorage.clear();
}

    changePassword(id: number, recoveryPassword: RecoveryPassword): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(`${this.url}administrators/changePassword/${id}`, recoveryPassword, {
        headers,
        });
    }

    getOne(id: Number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}administrators/getOne/${id}`, { headers });
    }

    update(id: number, administrator: Administrator): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(`${this.url}administrators/edit/${id}`, administrator, { headers });
    }

}