import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { FilterAlojamientoPipe } from '../../../pipes/FilterAlojamientoPipe';
import { UserService } from '../../services/user.service';
import { AdministratorService } from '../../services/administrator.service';
import { HostService } from '../../services/host.service';

// Declaración de variable global para modales de Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AccommodationService],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule, // Necesario para [(ngModel)]
    FilterAlojamientoPipe, // Pipe para filtrar alojamientos por búsqueda
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Array de alojamientos que se mostrarán en la página
  public accommodations: Accommodation[] = [];

  // Texto de búsqueda para filtrar alojamientos
  public searchText: string = '';

  // Mensaje de error para modales
  public errorMessage: string = '';

  // Referencias a modales de Bootstrap
  private successModal: any;
  private errorModal: any;

  /**
   * Constructor del componente
   * @param _accommodationService Servicio para obtener alojamientos
   */
  constructor(
    private _accommodationService: AccommodationService,
    public userService: UserService,
    public administratorService: AdministratorService,
    public hostService: HostService
  ) {}

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Carga todos los alojamientos desde el servicio
   */
  ngOnInit(): void {
    this.loadAccommodations();
  }

  /**
   * Método de Angular que se ejecuta después de renderizar la vista
   * Se utiliza para inicializar los modales de Bootstrap
   */
  ngAfterViewInit(): void {
    // Inicializar modal de éxito
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );

    // Inicializar modal de error
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Cargar todos los alojamientos desde el servicio
   */
  loadAccommodations(): void {
    this._accommodationService.getAll().subscribe({
      next: (response) => {
        // Asignar lista de alojamientos obtenida
        this.accommodations = response;
      },
      error: (err) => {
        // Mostrar error en consola si falla la carga
        console.error('Error al cargar alojamientos:', err);
      },
    });
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
   * Cerrar modal de éxito
   */
  closeModal(): void {
    this.successModal.hide();
  }
}
