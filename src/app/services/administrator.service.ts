import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator';
import { global } from './global';

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

}