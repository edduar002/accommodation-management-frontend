import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
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
   * Registra un nuevo administrador en el sistema
   * @param administrator Objeto Administrator con los datos del nuevo administrador
   * @returns Observable con la respuesta del servidor
   */
  register(administrator: Administrator): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del administrador
    return this._http.post<any>(
      `${this.url}administrators/register`,
      administrator,
      { headers }
    );
  }

  /**
   * Realiza el login de un administrador
   * @param credentials Objeto con email y password
   * @returns Observable con la respuesta del servidor (token y datos del administrador)
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de login con las credenciales
    return this._http.post<any>(
      `${this.url}administrators/login`,
      credentials,
      { headers }
    );
  }

  /**
   * Guarda los datos de sesión del administrador en el localStorage
   * @param data Datos recibidos del servidor (token y administrador)
   */
  saveSession(data: any): void {
    // Guarda el token del administrador en localStorage
    localStorage.setItem('token_administrator', data.token);

    // Guarda los datos completos del administrador en localStorage
    localStorage.setItem('administrator', JSON.stringify(data));
  }

  /**
   * Obtiene el token de sesión del administrador
   * @returns Token del administrador o null si no existe
   */
  getToken(): string | null {
    // Se obtiene el token del localStorage
    return localStorage.getItem('token_administrator');
  }

  /**
   * Obtiene los datos del administrador almacenados en sesión
   * @returns Objeto Administrator o null si no existe
   */
  getAdministrator(): Administrator | null {
    // Se obtiene el administrador del localStorage
    const administrator = localStorage.getItem('administrator');

    // Si existe, se parsea a objeto JSON; si no, devuelve null
    return administrator ? JSON.parse(administrator) : null;
  }

  /**
   * Cierra la sesión del administrador eliminando todos los datos del localStorage
   */
  logout(): void {
    // Limpia todo el localStorage
    localStorage.clear();
  }

  /**
   * Cambia la contraseña de un administrador
   * @param id ID del administrador
   * @param recoveryPassword Objeto RecoveryPassword con la nueva contraseña
   * @returns Observable con la respuesta del servidor
   */
  changePassword(
    id: number,
    recoveryPassword: RecoveryPassword
  ): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de cambio de contraseña pasando el ID y la nueva contraseña
    return this._http.put<any>(
      `${this.url}administrators/changePassword/${id}`,
      recoveryPassword,
      { headers }
    );
  }

  /**
   * Obtiene los datos de un administrador específico
   * @param id ID del administrador
   * @returns Observable con los datos del administrador
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de obtener administrador por ID
    return this._http.get<any>(`${this.url}administrators/getOne/${id}`, {
      headers,
    });
  }

  /**
   * Actualiza los datos de un administrador existente
   * @param id ID del administrador a actualizar
   * @param administrator Objeto Administrator con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, administrator: Administrator): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del administrador
    return this._http.put<any>(
      `${this.url}administrators/edit/${id}`,
      administrator,
      { headers }
    );
  }
}