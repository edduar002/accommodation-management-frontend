import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from '../models/host';
import { global } from './global';
import { Response } from '../models/response';

@Injectable()
export class ResponseService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  register(response: Response): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(`${this.url}responses/register`, response, {
      headers,
    });
  }

  getByComment(commentId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(
      `${this.url}responses/getByComment?commentId=${commentId}`,
      { headers }
    );
  }
}
