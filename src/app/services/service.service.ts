import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { global } from './global';

@Injectable()
export class ServiceService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(service: Service): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}services/register`, service, { headers });
    }

    getAll(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}services/getAll`, { headers });
    }

    getOne(id: Number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}services/getOne/${id}`, { headers });
    }

    update(id: number, service: Service): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(`${this.url}services/edit/${id}`, service, { headers });
    }

}