import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { HostService } from '../../services/host.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations', // Nombre del selector para usar el componente en plantillas
  standalone: true, // Declarado como componente independiente (sin módulo)
  imports: [CommonModule, RouterLink, FormsModule], // Módulos necesarios en el template
  templateUrl: './reservations.component.html', // Vista HTML asociada
  styleUrls: ['./reservations.component.css'], // Hoja de estilos del componente
  providers: [ReservationService], // Servicio disponible solo en este componente
})
export class ReservationsComponent implements OnInit {
  // Lista de reservas asociadas al anfitrión actual
  reservations: Reservation[] = [];

  // Almacena temporalmente la reserva seleccionada si se requiere acción adicional
  selectedReservationId?: number;

  /**
   * Constructor del componente.
   * Se inyectan los servicios necesarios para solicitudes HTTP y manejo de datos.
   */
  constructor(
    private http: HttpClient,
    private _reservationService: ReservationService,
    private _hostService: HostService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se realiza la carga de reservas del anfitrión.
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Actualiza el estado de una reserva.
   * @param reservation - Objeto de la reserva que se va a modificar
   * @param newStatus - Nuevo estado seleccionado por el anfitrión
   */
  updateStatus(reservation: Reservation, newStatus: string): void {
    // Actualizar el estado en memoria
    reservation.state = newStatus;

    // Persistir el cambio en el backend
    this._reservationService
      .changeStatus(reservation.id!, reservation)
      .subscribe({
        next: () => {
          console.log('✅ Estado actualizado con éxito');
        },
        error: (err) => {
          console.error('❌ Error al actualizar estado:', err);
        },
      });
  }

  /**
   * Obtiene todas las reservas correspondientes al anfitrión autenticado.
   * Si el ID del anfitrión no se encuentra, se reporta el error.
   */
  getAll(): void {
    const host = this._hostService.getHost(); // Obtener datos del anfitrión activo

    // Validar existencia del ID del anfitrión
    if (!host || host.id === undefined) {
      console.error('No se pudo obtener el ID del anfitrion.');
      return;
    }

    // Solicitud al backend para recuperar las reservas del anfitrión
    this._reservationService.getReservations(host.id).subscribe({
      next: (response: any) => {
        this.reservations = response;
      },
      error: (error) => {
        console.error('Error al obtener reservas:', error);
      },
    });
  }
}