import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { global } from './global';

@Injectable()
export class CommentService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  register(comment: Comment): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>(`${this.url}comments/register`, comment, {
      headers,
    });
  }

  getByAccommodation(accommodationId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<any>(
      `${this.url}comments/commentsList/${accommodationId}`,
      { headers }
    );
  }
}
