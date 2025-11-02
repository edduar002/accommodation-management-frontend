import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { global } from './global';

@Injectable()
export class CommentService {
  // URL base para las peticiones al backend
  public url: string;

  /**
   * Constructor del servicio
   * @param _http Inyección del servicio HttpClient para realizar peticiones HTTP
   */
  constructor(public _http: HttpClient) {
    // Se asigna la URL base desde la configuración global
    this.url = global.url;
  }

  /**
   * Registra un nuevo comentario en el sistema
   * @param comment Objeto Comment con los datos del comentario a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(comment: Comment): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del comentario
    return this._http.post<any>(`${this.url}comments/register`, comment, {
      headers,
    });
  }

  /**
   * Obtiene los comentarios asociados a un alojamiento específico
   * @param accommodationId ID del alojamiento
   * @returns Observable con la lista de comentarios del alojamiento
   */
  getByAccommodation(accommodationId: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de comentarios por alojamiento pasando el ID
    return this._http.get<any>(
      `${this.url}comments/commentsList/${accommodationId}`,
      { headers }
    );
  }
}