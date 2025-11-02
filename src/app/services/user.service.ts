import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { RecoveryPassword } from '../models/recoveryPassword';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
   * Registra un nuevo usuario en el sistema
   * @param user Objeto User con los datos del nuevo usuario
   * @returns Observable con la respuesta del servidor
   */
  register(user: User): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de registro con los datos del usuario
    return this._http.post<any>(`${this.url}users/register`, user, { headers });
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

  /**
   * Realiza el login de un usuario
   * @param credentials Objeto con email y password
   * @returns Observable con la respuesta del servidor (token y datos del usuario)
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición POST al endpoint de login con las credenciales
    return this._http.post<any>(`${this.url}users/login`, credentials, {
      headers,
    });
  }

  /**
   * Guarda los datos de sesión del usuario en el localStorage
   * @param data Datos recibidos del servidor (token y usuario)
   */
  saveSession(data: any): void {
    // Guarda el token del usuario en localStorage
    localStorage.setItem('token_user', data.token);

    // Guarda los datos completos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(data));
  }

  /**
   * Obtiene el token de sesión del usuario
   * @returns Token del usuario o null si no existe
   */
  getToken(): string | null {
    // Se obtiene el token del localStorage
    return localStorage.getItem('token_user');
  }

  /**
   * Obtiene los datos del usuario almacenados en sesión
   * @returns Objeto User o null si no existe
   */
  getUser(): User | null {
    // Se obtiene el usuario del localStorage
    const user = localStorage.getItem('user');

    // Si existe, se parsea a objeto JSON; si no, devuelve null
    return user ? JSON.parse(user) : null;
  }

  /**
   * Cierra la sesión del usuario eliminando todos los datos del localStorage
   */
  logout(): void {
    // Limpia todo el localStorage
    localStorage.clear();
  }

  /**
   * Obtiene todos los usuarios registrados
   * @returns Observable con la lista de usuarios
   */
  getAll(): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint que devuelve todos los usuarios
    return this._http.get<any>(`${this.url}users/getAll`, { headers });
  }

  /**
   * Elimina (desactiva) un usuario según su ID
   * @param id ID del usuario a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de eliminación pasando el ID del usuario
    return this._http.put<any>(`${this.url}users/delete/${id}`, { headers });
  }

  /**
   * Cambia la contraseña de un usuario
   * @param id ID del usuario
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
      `${this.url}users/changePassword/${id}`,
      recoveryPassword,
      {
        headers,
      }
    );
  }

  /**
   * Obtiene los datos de un usuario específico
   * @param id ID del usuario
   * @returns Observable con los datos del usuario
   */
  getOne(id: Number): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición GET al endpoint de detalle de usuario pasando su ID
    return this._http.get<any>(`${this.url}users/getOne/${id}`, { headers });
  }

  /**
   * Actualiza los datos de un usuario existente
   * @param id ID del usuario a actualizar
   * @param user Objeto User con los nuevos datos
   * @returns Observable con la respuesta del servidor
   */
  update(id: number, user: User): Observable<any> {
    // Se crean los headers indicando que el contenido es JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Se realiza la petición PUT al endpoint de edición pasando el ID y los nuevos datos del usuario
    return this._http.put<any>(`${this.url}users/edit/${id}`, user, {
      headers,
    });
  }
}