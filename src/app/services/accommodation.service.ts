import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation';
import { global } from './global';

@Injectable()
export class AccommodationService {
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
   * Registra un nuevo alojamiento en el sistema
   * @param accommodation Objeto Accommodation con los datos del alojamiento a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(accommodation: Accommodation): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del alojamiento
    return this._http.post<any>(
      `${this.url}accommodations/register`,
      accommodation,
      { headers }
    );
  }

  /**
   * Elimina (desactiva) un alojamiento según su ID
   * @param id Identificador del alojamiento a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID
    return this._http.put<any>(`${this.url}accommodations/delete/${id}`, {
      headers,
    });
  }

  /**
   * Obtiene todos los alojamientos disponibles
   * @returns Observable con la lista de alojamientos
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de búsqueda de alojamientos disponibles
    return this._http.get<any>(
      `${this.url}accommodations/searchAvailableAccommodations`,
      { headers }
    );
  }

  /**
   * Obtiene todos los alojamientos propios de un anfitrión específico
   * @param idHost Identificador del anfitrión
   * @returns Observable con la lista de alojamientos del anfitrión
   */
  getAllOwn(idHost: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de alojamientos propios pasando el ID del anfitrión como query
    return this._http.get<any>(
      `${this.url}accommodations/ownAccommodationList?idHost=${idHost}`,
      { headers }
    );
  }

  /**
   * Obtiene el promedio de calificaciones de un alojamiento.
   * @param id ID del alojamiento
   * @returns Observable con el promedio de calificación
   */
  getAverageCalification(id: number): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<number>(
      `${this.url}accommodations/averageCalification/${id}`,
      { headers }
    );
  }

  /**
   * Actualiza los datos de un alojamiento existente
   * @param id Identificador del alojamiento a actualizar
   * @param accommodation Objeto Accommodation con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, accommodation: Accommodation): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del alojamiento
    return this._http.put<any>(
      `${this.url}accommodations/edit/${id}`,
      accommodation,
      { headers }
    );
  }

  /**
   * Obtiene los detalles de un alojamiento específico
   * @param id Identificador del alojamiento
   * @returns Observable con los datos del alojamiento
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalles del alojamiento pasando su ID
    return this._http.get<any>(`${this.url}accommodations/detail/${id}`, {
      headers,
    });
  }
}