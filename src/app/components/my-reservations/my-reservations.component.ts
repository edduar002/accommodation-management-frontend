import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

// Declaración de variable global para modales de Bootstrap
declare var bootstrap: any;

/**
 * Componente MyReservationsComponent
 *
 * Permite al usuario autenticado visualizar todas sus reservas,
 * consultar su estado y calificar reservas concluidas.
 */
@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css'],
  providers: [ReservationService],
})
export class MyReservationsComponent implements OnInit {
  /** Lista de reservas del usuario */
  reservations: Reservation[] = [];

  /** ID de la reserva seleccionada */
  selectedReservationId?: number;

  /** Reserva actualmente seleccionada para calificación */
  selectedReservation: any = null;

  /** Valor de calificación ingresado por el usuario (0 a 5) */
  ratingValue: number = 0;

  /**
   * Constructor del componente
   * @param http Cliente HTTP para llamadas al backend
   * @param _reservationService Servicio para gestionar reservas
   * @param _userService Servicio para obtener información del usuario
   */
  constructor(
    private http: HttpClient,
    private _reservationService: ReservationService,
    private _userService: UserService
  ) {}

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Obtiene todas las reservas del usuario autenticado
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtiene todas las reservas del usuario autenticado
   * Hace una llamada al backend usando el servicio ReservationService
   */
  getAll(): void {
    const user = this._userService.getUser();

    if (!user || user.id === undefined) {
      console.error('No se pudo obtener el ID del usuario.');
      return;
    }

    this._reservationService.getMyReservations(user.id).subscribe({
      next: (response: Reservation[]) => {
        this.reservations = response;
      },
      error: (error) => {
        console.error('Error al obtener reservas:', error);
      },
    });
  }

  /**
   * Abre el modal de calificación para una reserva específica
   * @param reservation Reserva seleccionada para calificar
   */
  openRatingModal(reservation: any) {
    this.selectedReservation = reservation;
    this.ratingValue = 0;

    const modalElement = document.getElementById('ratingModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /**
   * Envía la calificación ingresada por el usuario
   * Valida el rango de calificación antes de enviarla
   */
  submitRating() {
    if (this.ratingValue < 0 || this.ratingValue > 5) {
      console.warn('Calificación fuera de rango (0-5)');
      return;
    }

    console.log('Reserva calificada:', this.selectedReservation);
    console.log('Calificación:', this.ratingValue);

    // Guardar calificación en el backend
    this.saveRating(this.selectedReservation, this.ratingValue);

    // Cerrar el modal
    const modalEl = document.getElementById('ratingModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    }
  }

  /**
   * Guarda la calificación en el backend usando el servicio ReservationService
   * @param reservation Reserva a actualizar
   * @param rating Valor de calificación (0 a 5)
   */
  saveRating(reservation: Reservation, rating: number): void {
    if (rating < 0 || rating > 5) {
      console.warn('La calificación debe estar entre 0 y 5');
      this.showErrorModal();
      return;
    }

    // Actualizar objeto localmente
    reservation.calification = rating;

    // Guardar en backend
    this._reservationService
      .saveRating(reservation.id!, reservation)
      .subscribe({
        next: () => {
          console.log('Calificación guardada con éxito');
          this.showSuccessModal();
        },
        error: () => {
          console.error('Error al guardar calificación');
          this.showErrorModal();
        },
      });
  }

  /**
   * Muestra el modal de éxito al guardar calificación correctamente
   */
  showSuccessModal() {
    const modalEl = document.getElementById('successModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  /**
   * Muestra el modal de error si ocurre un fallo al guardar calificación
   */
  showErrorModal() {
    const modalEl = document.getElementById('errorModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }
}