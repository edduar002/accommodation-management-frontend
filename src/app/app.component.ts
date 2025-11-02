import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service'; 
import { AdministratorService } from './services/administrator.service'; 
import { HostService } from './services/host.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Título de la aplicación
  title = 'mi-app';

  /**
   * Constructor del componente principal.
   * Inyecta los servicios de usuario, administrador y anfitrión
   * para que puedan ser usados en el HTML y en los métodos del componente.
   */
  constructor(
    public userService: UserService,
    public administratorService: AdministratorService,
    public hostService: HostService
  ) {} 

  /**
   * Método para cerrar sesión.
   * Llama al método logout() de todos los servicios para limpiar los tokens.
   */
  confirmLogout() {
    // Cierra sesión del usuario normal
    this.userService.logout();
    // Cierra sesión del administrador
    this.administratorService.logout();
    // Cierra sesión del anfitrión
    this.hostService.logout();
  }

  /**
   * Método para verificar si hay algún usuario logueado.
   * Retorna true si alguno de los servicios tiene un token válido.
   */
  isLoggedIn(): boolean {
    return (
      this.userService.getToken() !== null || // Verifica token de usuario
      this.administratorService.getToken() !== null || // Verifica token de administrador
      this.hostService.getToken() !== null // Verifica token de anfitrión
    );
  }

  /**
   * Método para verificar si el usuario logueado es un anfitrión.
   * Retorna true solo si no hay usuario ni administrador logueado, y sí hay anfitrión.
   */
  isHostLoggedIn(): boolean {
    return (
      this.userService.getToken() === null && // Usuario no logueado
      this.administratorService.getToken() === null && // Administrador no logueado
      this.hostService.getToken() !== null // Anfitrión logueado
    );
  }

  /**
   * Método para verificar si el usuario logueado es un administrador.
   * Retorna true solo si no hay usuario ni anfitrión logueado, y sí hay administrador.
   */
  isAdministratorLoggedIn(): boolean {
    return (
      this.userService.getToken() === null && // Usuario no logueado
      this.administratorService.getToken() !== null && // Administrador logueado
      this.hostService.getToken() === null // Anfitrión no logueado
    );
  }

  /**
   * Método para verificar si el usuario logueado es un usuario normal.
   * Retorna true solo si hay token de usuario y no hay administrador ni anfitrión logueado.
   */
  isUserLoggedIn(): boolean {
    return (
      this.userService.getToken() !== null && // Usuario logueado
      this.administratorService.getToken() === null && // Administrador no logueado
      this.hostService.getToken() === null // Anfitrión no logueado
    );
  }
}