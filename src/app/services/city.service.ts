import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { global } from './global';

@Injectable()
export class CityService {
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
   * Registra una nueva ciudad en el sistema
   * @param city Objeto City con los datos de la ciudad a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(city: City): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos de la ciudad
    return this._http.post<any>(`${this.url}cities/register`, city, {
      headers,
    });
  }

  /**
   * Obtiene todas las ciudades registradas
   * @returns Observable con la lista de ciudades
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint que devuelve todas las ciudades
    return this._http.get<any>(`${this.url}cities/getAll`, { headers });
  }

  /**
   * Obtiene todas las ciudades pertenecientes a un departamento específico
   * @param idDepartment ID del departamento
   * @returns Observable con la lista de ciudades del departamento
   */
  getAllForDepartment(idDepartment: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de ciudades por departamento pasando el ID como parámetro
    return this._http.get<any>(`${this.url}cities/getAllForDepartment`, {
      headers,
      params: { departmentId: idDepartment },
    });
  }

  /**
   * Obtiene los datos de una ciudad específica
   * @param id ID de la ciudad
   * @returns Observable con los datos de la ciudad
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalle de ciudad pasando su ID
    return this._http.get<any>(`${this.url}cities/getOne/${id}`, { headers });
  }

  /**
   * Actualiza los datos de una ciudad existente
   * @param id ID de la ciudad a actualizar
   * @param city Objeto City con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, city: City): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos de la ciudad
    return this._http.put<any>(`${this.url}cities/edit/${id}`, city, {
      headers,
    });
  }

  /**
   * Elimina (desactiva) una ciudad según su ID
   * @param id ID de la ciudad a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID de la ciudad
    return this._http.put<any>(`${this.url}cities/delete/${id}`, { headers });
  }
}