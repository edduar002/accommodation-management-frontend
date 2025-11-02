import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { CommentsComponent } from '../comments/comments.component';
import { UserService } from '../../services/user.service';
import { HostService } from '../../services/host.service';
import { AdministratorService } from '../../services/administrator.service';

declare var bootstrap: any; // Declaración de Bootstrap para poder usar Carousel

@Component({
  selector: 'app-detail-accommodation',
  standalone: true,
  imports: [CommonModule, CommentsComponent, FormsModule],
  templateUrl: './detail-accommodation.component.html',
  styleUrls: ['./detail-accommodation.component.css'],
  providers: [AccommodationService], // Servicio para manejar alojamientos
})
export class DetailAccommodationComponent implements OnInit, AfterViewInit {
  public accommodation!: Accommodation; // Objeto que contiene los detalles del alojamiento
  public isLoading: boolean = true; // Estado de carga
  public errorMessage: string = ''; // Mensaje de error en caso de fallo
  public checkIn!: string; // Fecha de check-in seleccionada
  public checkOut!: string; // Fecha de check-out seleccionada
  public guests: number = 1; // Número de personas
  public totalPrice: number | null = null; // Total calculado de la reserva

  /**
   * Constructor del componente
   * @param _route Para obtener parámetros de la ruta (ID del alojamiento)
   * @param _accommodationService Servicio para obtener datos de alojamiento
   */
  constructor(
    private _route: ActivatedRoute,
    private _accommodationService: AccommodationService,
    public userService: UserService,
    public hostService: HostService,
    public administratorService: AdministratorService
  ) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Obtiene el alojamiento desde la API
   */
  ngOnInit(): void {
    this.getAccommodation();
  }

  /**
   * Calcula el total de la reserva en base a las fechas y precio del alojamiento
   */
  calculateTotal(): void {
    // Si no hay fechas seleccionadas o precio no definido, no hace nada
    if (!this.checkIn || !this.checkOut || !this.accommodation?.price) {
      return;
    }

    // Convertir fechas a objetos Date
    const start = new Date(this.checkIn);
    const end = new Date(this.checkOut);

    // Calcular número de noches
    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    // Calcular el total solo si hay noches positivas
    this.totalPrice = nights > 0 ? nights * this.accommodation.price : null;
  }

  /**
   * Método del ciclo de vida AfterViewInit
   * Se ejecuta después de renderizar la vista
   * Inicializa el carousel de imágenes de Bootstrap
   */
  ngAfterViewInit(): void {
    const carouselEl = document.querySelector('#accommodationCarousel');
    if (carouselEl) {
      new bootstrap.Carousel(carouselEl, {
        interval: 3500, // Cambio automático cada 3.5 segundos
        pause: 'hover', // Pausa al pasar el mouse
      });
    }
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
   * Obtener alojamiento por ID desde la API
   */
  getAccommodation(): void {
    // Suscribirse a los parámetros de la ruta
    this._route.params.subscribe((params) => {
      const id = +params['id']; // Convertir ID a número

      // Llamar al servicio para obtener el alojamiento
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          // Guardar los datos obtenidos y cambiar estado de carga
          this.accommodation = response;
          this.isLoading = false;
        },
        error: (err) => {
          // Manejo de error y mensaje de usuario
          console.error('Error al cargar alojamiento:', err);
          this.errorMessage =
            'No se pudo cargar la información del alojamiento.';
          this.isLoading = false;
        },
      });
    });
  }
}
