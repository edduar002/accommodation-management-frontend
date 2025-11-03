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
    return this._http.post<any>(
      `${this.url}reservations/register`,
      reservation,
      {
        headers,
      }
    );
  }

  /**
   * Obtiene los detalles de una reserva específica
   * @param id Identificador de la reserva
   * @returns Observable con los datos de la reserva
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalles de la reserva pasando su ID
    return this._http.get<any>(
      `${this.url}reservations/viewReservationDetails/${id}`,
      {
        headers,
      }
    );
  }

  /**
   * Obtiene todas las reservas propias de un anfitrión específico
   * @param idHost Identificador del anfitrión
   * @returns Observable con la lista de reservas del anfitrión
   */
  getReservations(idHost: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de reservas propias pasando el ID del anfitrión como query
    return this._http.get<any>(
      `${this.url}reservations/viewReservations?idHost=${idHost}`,
      { headers }
    );
  }

  /**
   * Obtiene todas las reservas propios de un usuario específico
   * @param idUser Identificador del usuario
   * @returns Observable con la lista de reservas del usuario
   */
  getMyReservations(idUser: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de reservas propias pasando el ID del usuario como query
    return this._http.get<any>(
      `${this.url}reservations/viewReservationHistory?idUser=${idUser}`,
      { headers }
    );
  }

  /**
   * Actualiza el estado de una reserva existente
   * @param id ID de la reserva a actualizar
   * @param reservation Objeto Reservation con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  changeStatus(id: number, reservation: Reservation): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos de la reserva
    return this._http.put<any>(
      `${this.url}reservations/changeStatus/${id}`,
      reservation,
      { headers }
    );
  }
}