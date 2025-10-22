import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from '../models/host';
import { global } from './global';

@Injectable()
export class HostService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(host: Host): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}hosts/register`, host, { headers });
    }

}