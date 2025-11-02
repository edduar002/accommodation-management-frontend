import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { global } from './global';

/**
 * Servicio Angular para manejar las reservas del sistema.
 * Permite registrar nuevas reservas realizando peticiones HTTP al backend.
 */
@Injectable()
export class ReservationService {
  /** URL base para las peticiones al backend */
  public url: string;

  /**
   * Constructor del servicio
   * @param _http Inyección de HttpClient para realizar peticiones HTTP
   */
  constructor(public _http: HttpClient) {
    // Se asigna la URL base desde la configuración global
    this.url = global.url;
  }

  /**
   * Registra una nueva reserva en el sistema.
   * @param reservation Objeto Reservation con los datos de la reserva a registrar
   * @returns Observable<any> con la respuesta del servidor
   */
  register(reservation: Reservation): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos de la reserva
    return this._http.post<any>(`${this.url}reservations/register`, reservation, {
      headers,
    });
  }
}