import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from '../models/host';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';

@Injectable({
  providedIn: 'root',
})
export class HostService {
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
   * Registra un nuevo anfitrión en el sistema
   * @param host Objeto Host con los datos del nuevo anfitrión
   * @returns Observable con la respuesta del servidor
   */
  register(host: Host): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del anfitrión
    return this._http.post<any>(`${this.url}hosts/register`, host, { headers });
  }

  /**
   * Realiza el login de un anfitrión
   * @param credentials Objeto con email y password
   * @returns Observable con la respuesta del servidor (token y datos del anfitrión)
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de login con las credenciales
    return this._http.post<any>(`${this.url}hosts/login`, credentials, {
      headers,
    });
  }

  /**
   * Guarda los datos de sesión del anfitrión en el localStorage
   * @param data Datos recibidos del servidor (token y anfitrión)
   */
  saveSession(data: any): void {
    // Guarda el token del anfitrión en localStorage
    localStorage.setItem('token_host', data.token);

    // Guarda los datos completos del anfitrión en localStorage
    localStorage.setItem('host', JSON.stringify(data));
  }

  /**
   * Obtiene el token de sesión del anfitrión
   * @returns Token del anfitrión o null si no existe
   */
  getToken(): string | null {
    // Se obtiene el token del localStorage
    return localStorage.getItem('token_host');
  }

  /**
   * Obtiene los datos del anfitrión almacenados en sesión
   * @returns Objeto Host o null si no existe
   */
  getHost(): Host | null {
    // Se obtiene el anfitrión del localStorage
    const host = localStorage.getItem('host');

    // Si existe, se parsea a objeto JSON; si no, devuelve null
    return host ? JSON.parse(host) : null;
  }

  /**
   * Cierra la sesión del anfitrión eliminando todos los datos del localStorage
   */
  logout(): void {
    // Limpia todo el localStorage
    localStorage.clear();
  }

  /**
   * Obtiene todos los anfitriones registrados
   * @returns Observable con la lista de anfitriones
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint que devuelve todos los anfitriones
    return this._http.get<any>(`${this.url}hosts/getAll`, { headers });
  }

  /**
   * Elimina (desactiva) un anfitrión según su ID
   * @param id ID del anfitrión a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID del anfitrión
    return this._http.put<any>(`${this.url}hosts/delete/${id}`, { headers });
  }

  /**
   * Cambia la contraseña de un anfitrión
   * @param id ID del anfitrión
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
      `${this.url}hosts/changePassword/${id}`,
      recoveryPassword,
      {
        headers,
      }
    );
  }

  /**
   * Obtiene los datos de un anfitrión específico
   * @param id ID del anfitrión
   * @returns Observable con los datos del anfitrión
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalle de anfitrión pasando su ID
    return this._http.get<any>(`${this.url}hosts/getOne/${id}`, { headers });
  }

  /**
   * Actualiza los datos de un anfitrión existente
   * @param id ID del anfitrión a actualizar
   * @param host Objeto Host con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, host: Host): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del anfitrión
    return this._http.put<any>(`${this.url}hosts/edit/${id}`, host, {
      headers,
    });
  }

  /**
   * Sube una imagen al servidor
   * @param file Archivo de imagen a subir
   * @returns Observable con la respuesta del servidor
   */
  uploadImage(file: File): Observable<any> {
    // Se crea un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    // Se realiza la petición POST al endpoint de subida de imágenes
    return this._http.post<any>(`${this.url}images/upload`, formData);
  }
}