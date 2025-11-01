import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from '../models/host';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';
import { Administrator } from '../models/administrator';

@Injectable()
export class HostService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  register(host: Host): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(`${this.url}hosts/register`, host, { headers });
  }

  login(host: Host): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this._http.post<any>(`${this.url}hosts/login`, host, { headers });
}

saveSession(data: any): void {
  localStorage.setItem('token', data.token); // Guarda el token
  localStorage.setItem('host', JSON.stringify(data)); // Guarda todo el usuario
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getHost(): Host | null {
  const host = localStorage.getItem('host');
  return host ? JSON.parse(host) : null;
}

logout(): void {
  localStorage.clear();
}

  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}hosts/getAll`, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}hosts/delete/${id}`, { headers });
  }

  changePassword(id: number, recoveryPassword: RecoveryPassword): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}hosts/changePassword/${id}`, recoveryPassword, {
      headers,
    });
  }

  getOne(id: Number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}hosts/getOne/${id}`, { headers });
  }

  update(id: number, host: Host): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.put<any>(`${this.url}hosts/edit/${id}`, host, { headers });
  }

    uploadImage(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this._http.post<any>(`${this.url}images/upload`, formData);
}

}
