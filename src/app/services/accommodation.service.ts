import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation';
import { global } from './global';

@Injectable()
export class AccommodationService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    register(accommodation: Accommodation): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post<any>(`${this.url}accommodations/register`, accommodation, { headers });
    }

    delete(id: number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(`${this.url}accommodations/delete/${id}`, { headers });
    }

    getAll(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}accommodations/searchAvailableAccommodations`, { headers });
    }

    update(id: number, accommodation: Accommodation): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.put<any>(`${this.url}accommodations/edit/${id}`, accommodation, { headers });
    }

    getOne(id: Number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get<any>(`${this.url}accommodations/detail/${id}`, { headers });
    }

}