import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { CommentsComponent } from '../comments/comments.component';
import { UserService } from '../../services/user.service';
import { HostService } from '../../services/host.service';
import { AdministratorService } from '../../services/administrator.service';
import { ReservationService } from '../../services/reservation.service';
import { Accommodation } from '../../models/accommodation';
import { Reservation } from '../../models/reservation';
import { Router } from '@angular/router';

declare var bootstrap: any; // Declaración para usar Bootstrap JS (modal, carousel)

/**
 * Componente que muestra los detalles de un alojamiento y permite realizar reservas.
 */
@Component({
  selector: 'app-detail-accommodation',
  standalone: true,
  imports: [CommonModule, CommentsComponent, FormsModule],
  templateUrl: './detail-accommodation.component.html',
  styleUrls: ['./detail-accommodation.component.css'],
  providers: [AccommodationService, ReservationService], // Servicios usados por el componente
})
export class DetailAccommodationComponent implements OnInit, AfterViewInit {
  public accommodation!: Accommodation; // Detalles del alojamiento obtenido desde la API
  public isLoading: boolean = true; // Indica si los datos aún se están cargando
  public errorMessage: string = ''; // Mensaje de error en caso de fallo al obtener datos
  public checkIn!: string; // Fecha seleccionada de check-in
  public checkOut!: string; // Fecha seleccionada de check-out
  public guests: number = 1; // Número de huéspedes
  public totalPrice: number | null = null; // Precio total calculado
  reservation: Reservation; // Objeto que representa la reserva actual

  /**
   * Constructor del componente
   * @param _route Servicio para obtener parámetros de la ruta
   * @param _accommodationService Servicio para obtener datos de alojamiento
   * @param userService Servicio de usuario para autenticación
   * @param _reservationService Servicio para manejar reservas
   * @param hostService Servicio de anfitrión para autenticación
   * @param administratorService Servicio de administrador para autenticación
   * @param route Servicio para manejar rutas
   * @param router Servicio para navegación
   */
  constructor(
    private _route: ActivatedRoute,
    private _accommodationService: AccommodationService,
    public userService: UserService,
    private _reservationService: ReservationService,
    public hostService: HostService,
    public administratorService: AdministratorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializa la reserva con valores por defecto
    this.reservation = new Reservation(
      new Date(), // checkIn
      new Date(), // checkOut
      1, // numberGuests
      'Pendiente', // state
      1, // accommodationsId (se actualizará luego)
      1, // usersId
      1, // hostsId
      0, // calification
      '', // url de la imagen
      '', // descripcon detallada
      '' // ciudad
    );
  }

  /**
   * Ciclo de vida OnInit.
   * Se ejecuta al inicializar el componente.
   * Obtiene los datos del alojamiento y asigna el ID a la reserva.
   */
  ngOnInit(): void {
    this.getAccommodation();

    // Obtener el parámetro 'id' de la ruta
    this.route.paramMap.subscribe((params) => {
      const accommodationId = params.get('id');
      if (accommodationId) {
        this.reservation.accommodationsId = +accommodationId; // Convertir a número
      }
    });
  }

  /**
   * Calcula el total de la reserva según la cantidad de noches y el precio por noche.
   */
  calculateTotal(): void {
    if (!this.checkIn || !this.checkOut || !this.accommodation?.price) return;

    const start = new Date(this.checkIn);
    const end = new Date(this.checkOut);

    // Número de noches
    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    // Asignar total solo si hay noches válidas
    this.totalPrice = nights > 0 ? nights * this.accommodation.price : null;
  }

  /**
   * Ciclo de vida AfterViewInit.
   * Inicializa el carousel de Bootstrap después de renderizar la vista.
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
   * Verifica si el usuario logueado es un usuario normal (no administrador ni anfitrión).
   * @returns boolean
   */
  isUserLoggedIn(): boolean {
    return (
      this.userService.getToken() !== null &&
      this.administratorService.getToken() === null &&
      this.hostService.getToken() === null
    );
  }

  /**
   * Realiza la reserva del alojamiento.
   * @param form Formulario de Angular para validación y reset
   */
  reservarAhora(form: NgForm): void {
    if (!this.checkIn || !this.checkOut || !this.guests) {
      this.showErrorModal(
        'Por favor completa todos los campos antes de reservar.'
      );
      return;
    }

    const user = this.userService.getUser();
    if (!user || user.id === undefined) {
      this.showErrorModal('Debes iniciar sesión para reservar.');
      return;
    }

    // Asignar datos a la reserva
    this.reservation.usersId = user.id;
    this.reservation.numberGuests = this.guests;
    this.reservation.state = 'Pendiente';

    // Obtener el alojamiento para asignar hostsId
    this._accommodationService
      .getOne(this.reservation.accommodationsId)
      .subscribe({
        next: (accommodation) => {
          this.reservation.hostsId = accommodation.hostsId;

          // Registrar la reserva
          this._reservationService.register(this.reservation).subscribe({
            next: () => {
              this.showSuccessModal();
              form.resetForm();
              this.totalPrice = null;
              this.router.navigate(['/myReservations']);
            },
            error: (error) => {
              console.error('Error al crear la reserva:', error);
              this.showErrorModal(
                'Ocurrió un error al procesar tu reserva.'
              );
            },
          });
        },
        error: (err) => {
          console.error('Error al obtener el alojamiento:', err);
          this.showErrorModal(
            'No se pudo obtener la información del alojamiento.'
          );
        },
      });
  }

  /**
   * Obtiene los detalles de un alojamiento desde la API según el ID en la ruta.
   */
  getAccommodation(): void {
    this._route.params.subscribe((params) => {
      const id = +params['id'];
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          this.accommodation = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar alojamiento:', err);
          this.errorMessage =
            'No se pudo cargar la información del alojamiento.';
          this.isLoading = false;
        },
      });
    });
  }

  /**
   * Muestra el modal de éxito de la reserva.
   */
  showSuccessModal() {
    const modalEl = document.getElementById('successModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  /**
   * Muestra el modal de error de la reserva con un mensaje personalizado.
   * @param message Mensaje a mostrar en el modal
   */
  showErrorModal(message: string) {
    const modalEl = document.getElementById('errorModal');
    if (modalEl) {
      const body = modalEl.querySelector('.modal-body');
      if (body) body.textContent = message;

      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}