/**
 * Clase que representa una reserva dentro del sistema.
 * Contiene la información básica de la reserva, incluyendo fechas,
 * número de huéspedes, estado, IDs relacionados y calificación.
 */
export class Reservation {
  /**
   * Constructor de la clase Reservation.
   * @param checkIn Fecha de entrada (check-in)
   * @param checkOut Fecha de salida (check-out)
   * @param numberGuests Número de personas que harán la reserva
   * @param state Estado de la reserva (pendiente, confirmada, cancelada, etc.)
   * @param accommodationsId ID del alojamiento reservado
   * @param usersId ID del usuario que realiza la reserva
   * @param hostsId ID del anfitrión propietario del alojamiento
   * @param calification Calificación de la reserva (inicialmente 0)
   * @param id ID opcional de la reserva (útil para edición o BD)
   * @param createdAt Fecha de creación de la reserva (opcional)
   * @param updatedAt Fecha de última actualización de la reserva (opcional)
   */
  constructor(
    public checkIn: Date,
    public checkOut: Date,
    public numberGuests: number,
    public state: string,
    public accommodationsId: number,
    public usersId: number,
    public hostsId: number,
    public calification: number,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}