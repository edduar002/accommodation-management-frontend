import { ReservationService } from '../../services/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-reservation.component.html',
  styleUrl: './detail-reservation.component.css',
  providers: [ReservationService],
})
export class DetailReservationComponent implements OnInit {
  /**
   * Objeto que almacenará la información de la reserva obtenida del backend.
   */
  public reservation: Reservation;

  constructor(
    private _reservationService: ReservationService, // Servicio encargado de gestionar las reservas
    private _route: ActivatedRoute, // Permite acceder a los parámetros de la ruta
    private _router: Router // Permite realizar redirecciones
  ) {
    /**
     * Se inicializa una reserva por defecto para evitar errores
     * antes de recibir los datos desde el servidor.
     */
    this.reservation = new Reservation(
      new Date(), // checkIn
      new Date(), // checkOut
      1, // numberGuests
      'Pendiente', // state
      1, // accommodationsId
      1, // usersId
      1, // hostsId
      0 // calification
    );
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se usa para cargar la información de la reserva desde la base de datos.
   */
  ngOnInit(): void {
    this.getOne();
  }

  /**
   * Obtiene la información de una reserva específica según el ID recibido por la URL.
   */
  getOne(): void {
    this._route.params.subscribe((params) => {
      const id = +params['id']; // Convertir ID a número

      this._reservationService.getOne(id).subscribe(
        (response) => {
          // Asignar la reserva recibida desde el backend al objeto local
          this.reservation = response;
        },
        (error) => {
          console.error('Error al cargar la reserva:', error);

          // Si algo falla, se redirige al usuario a la página principal
          this._router.navigate(['/']);
        }
      );
    });
  }
}