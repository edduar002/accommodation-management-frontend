import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { global } from './global';

@Injectable()
export class CityService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  register(city: City): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(`${this.url}cities/register`, city, {
      headers,
    });
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}cities/getAll`, { headers });
  }

  getAllForDepartment(idDepartment: number): Observable<any> {
    console.log(idDepartment)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}cities/getAllForDepartment`, {
      headers,
      params: { departmentId: idDepartment },
    });
  }

  getOne(id: Number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(`${this.url}cities/getOne/${id}`, { headers });
  }

  update(id: number, city: City): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}cities/edit/${id}`, city, {
      headers,
    });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<any>(`${this.url}cities/delete/${id}`, { headers });
  }
}
