import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-reservations', // Identificador del componente
  standalone: true, // Se usa como componente independiente
  imports: [CommonModule, RouterLink], // Módulos necesarios para el template
  templateUrl: './my-reservations.component.html', // Archivo HTML asociado
  styleUrls: ['./my-reservations.component.css'], // Estilos del componente
  providers: [ReservationService], // Servicio inyectado de forma local
})
export class MyReservationsComponent implements OnInit {
  // Arreglo que almacena las reservas del usuario autenticado
  reservations: Reservation[] = [];

  // ID temporal para acciones como eliminar una reserva (si fuera necesario)
  selectedReservationId?: number;

  /**
   * Constructor del componente
   * @param http Cliente HTTP para solicitudes
   * @param _reservationService Servicio para manejar operaciones con reservas
   * @param _userService Servicio para acceder a la información del usuario actual
   */
  constructor(
    private http: HttpClient,
    private _reservationService: ReservationService,
    private _userService: UserService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Aquí se obtienen las reservas del usuario.
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtiene todas las reservas del usuario actualmente autenticado.
   * Primero verifica si existe un usuario cargado en el sistema.
   * Si se tiene un ID válido, se llama al servicio para cargar sus reservas.
   */
  getAll(): void {
    const user = this._userService.getUser(); // Obtener usuario del servicio

    // Validación de existencia del usuario
    if (!user || user.id === undefined) {
      console.error('No se pudo obtener el ID del usuario.');
      return;
    }

    // Solicitud al backend para obtener reservas del usuario
    this._reservationService.getMyReservations(user.id).subscribe({
      next: (response: any) => {
        this.reservations = response; // Se asigna la respuesta al arreglo
      },
      error: (error) => {
        console.error('Error al obtener reservas:', error);
      },
    });
  }
}