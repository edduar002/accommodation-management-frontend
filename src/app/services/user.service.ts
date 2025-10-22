import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(user: User): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}users/register`, user, { headers });
    }

}