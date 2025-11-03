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

/**
 * Componente HomeComponent
 *
 * Se encarga de mostrar la página principal con:
 * - Alojamientos destacados
 * - Filtros de búsqueda
 * - Paneles dinámicos según tipo de usuario (usuario, administrador, anfitrión)
 */
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
  /** Array de alojamientos que se mostrarán en la página */
  public accommodations: Accommodation[] = [];

  /** Texto de búsqueda para filtrar alojamientos */
  public searchText: string = '';

  /** Mensaje de error mostrado en modales */
  public errorMessage: string = '';

  /** Referencia al modal de éxito de Bootstrap */
  private successModal: any;

  /** Referencia al modal de error de Bootstrap */
  private errorModal: any;

  /** Mapa que almacena la calificación promedio de cada alojamiento por su ID */
  public averageRatings: { [key: number]: number | null } = {};

  /**
   * Constructor del componente
   * @param _accommodationService Servicio para obtener alojamientos
   * @param userService Servicio para manejar datos del usuario
   * @param administratorService Servicio para manejar datos del administrador
   * @param hostService Servicio para manejar datos del anfitrión
   */
  constructor(
    private _accommodationService: AccommodationService,
    public userService: UserService,
    public administratorService: AdministratorService,
    public hostService: HostService
  ) {}

  /**
   * Método de Angular que se ejecuta al inicializar el componente.
   * Se encarga de cargar todos los alojamientos disponibles.
   */
  ngOnInit(): void {
    this.loadAccommodations();
  }

  /**
   * Método de Angular que se ejecuta después de renderizar la vista.
   * Inicializa los modales de Bootstrap.
   */
  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );

    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Cargar todos los alojamientos desde el servicio.
   * Para cada alojamiento, también obtiene la calificación promedio.
   */
  loadAccommodations(): void {
    this._accommodationService.getAll().subscribe({
      next: (response: Accommodation[]) => {
        this.accommodations = response;

        // Obtener calificación promedio para cada alojamiento
        this.accommodations.forEach((acc) => {
          if (acc.id !== undefined) {
            this._accommodationService
              .getAverageCalification(acc.id)
              .subscribe({
                next: (res: any) => {
                  this.averageRatings[acc.id!] = res ?? null;
                },
                error: (err) => {
                  console.error(
                    'Error al cargar calificación de alojamiento',
                    acc.id,
                    err
                  );
                  this.averageRatings[acc.id!] = null;
                },
              });
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err);
      },
    });
  }

  /**
   * Verifica si el usuario logueado es un anfitrión.
   * Retorna true solo si no hay usuario ni administrador logueado,
   * y sí hay un anfitrión logueado.
   */
  isHostLoggedIn(): boolean {
    return (
      this.userService.getToken() === null &&
      this.administratorService.getToken() === null &&
      this.hostService.getToken() !== null
    );
  }

  /**
   * Verifica si el usuario logueado es un administrador.
   * Retorna true solo si no hay usuario ni anfitrión logueado,
   * y sí hay un administrador logueado.
   */
  isAdministratorLoggedIn(): boolean {
    return (
      this.userService.getToken() === null &&
      this.administratorService.getToken() !== null &&
      this.hostService.getToken() === null
    );
  }

  /**
   * Verifica si el usuario logueado es un usuario normal.
   * Retorna true solo si hay token de usuario y no hay administrador ni anfitrión logueado.
   */
  isUserLoggedIn(): boolean {
    return (
      this.userService.getToken() !== null &&
      this.administratorService.getToken() === null &&
      this.hostService.getToken() === null
    );
  }

  /**
   * Verifica si hay algún tipo de usuario logueado (usuario, administrador o anfitrión)
   */
  isLoggedIn(): boolean {
    return (
      this.userService.getToken() !== null ||
      this.administratorService.getToken() !== null ||
      this.hostService.getToken() !== null
    );
  }

  /**
   * Cierra el modal de éxito
   */
  closeModal(): void {
    this.successModal.hide();
  }
}