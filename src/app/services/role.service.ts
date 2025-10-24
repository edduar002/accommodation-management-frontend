import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { global } from './global';

@Injectable()
export class RoleService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(role: Role): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}roles/register`, role, { headers });
    }

    getAll(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}roles/getAll`, { headers });
    }

    getOne(id: Number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}roles/getOne/${id}`, { headers });
    }

    update(id: number, role: Role): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(`${this.url}roles/edit/${id}`, role, { headers });
    }

}