import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Response } from '../models/response';

@Injectable()
export class ResponseService {
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
   * Registra una nueva respuesta en el sistema
   * @param response Objeto Response con los datos de la respuesta a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(response: Response): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos de la respuesta
    return this._http.post<any>(`${this.url}responses/register`, response, {
      headers,
    });
  }

  /**
   * Obtiene las respuestas asociadas a un comentario específico
   * @param commentId ID del comentario
   * @returns Observable con la lista de respuestas del comentario
   */
  getByComment(commentId: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de respuestas por comentario pasando el ID como query
    return this._http.get<any>(
      `${this.url}responses/getByComment?commentId=${commentId}`,
      { headers }
    );
  }
}