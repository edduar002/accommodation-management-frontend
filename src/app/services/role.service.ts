import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { global } from './global';

@Injectable()
export class RoleService {
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
   * Registra un nuevo rol en el sistema
   * @param role Objeto Role con los datos del rol a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(role: Role): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del rol
    return this._http.post<any>(`${this.url}roles/register`, role, { headers });
  }

  /**
   * Obtiene todos los roles registrados
   * @returns Observable con la lista de roles
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint que devuelve todos los roles
    return this._http.get<any>(`${this.url}roles/getAll`, { headers });
  }

  /**
   * Obtiene los datos de un rol específico
   * @param id ID del rol
   * @returns Observable con los datos del rol
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalle de rol pasando su ID
    return this._http.get<any>(`${this.url}roles/getOne/${id}`, { headers });
  }

  /**
   * Actualiza los datos de un rol existente
   * @param id ID del rol a actualizar
   * @param role Objeto Role con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, role: Role): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del rol
    return this._http.put<any>(`${this.url}roles/edit/${id}`, role, {
      headers,
    });
  }

  /**
   * Elimina (desactiva) un rol según su ID
   * @param id ID del rol a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID del rol
    return this._http.put<any>(`${this.url}roles/delete/${id}`, { headers });
  }
}