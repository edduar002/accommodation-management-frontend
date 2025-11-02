import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { global } from './global';

@Injectable()
export class DepartmentService {
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
   * Registra un nuevo departamento en el sistema
   * @param department Objeto Department con los datos del departamento a registrar
   * @returns Observable con la respuesta del servidor
   */
  register(department: Department): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del departamento
    return this._http.post<any>(`${this.url}departments/register`, department, {
      headers,
    });
  }

  /**
   * Obtiene todos los departamentos registrados
   * @returns Observable con la lista de departamentos
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint que devuelve todos los departamentos
    return this._http.get<any>(`${this.url}departments/getAll`, { headers });
  }

  /**
   * Obtiene los datos de un departamento específico
   * @param id ID del departamento
   * @returns Observable con los datos del departamento
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalle de departamento pasando su ID
    return this._http.get<any>(`${this.url}departments/getOne/${id}`, {
      headers,
    });
  }

  /**
   * Actualiza los datos de un departamento existente
   * @param id ID del departamento a actualizar
   * @param department Objeto Department con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, department: Department): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del departamento
    return this._http.put<any>(
      `${this.url}departments/edit/${id}`,
      department,
      { headers }
    );
  }

  /**
   * Elimina (desactiva) un departamento según su ID
   * @param id ID del departamento a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID del departamento
    return this._http.put<any>(`${this.url}departments/delete/${id}`, {
      headers,
    });
  }
}