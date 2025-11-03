/**
 * Clase que representa una reserva dentro del sistema.
 * Contiene la información básica de la reserva, incluyendo fechas,
 * número de huéspedes, estado, IDs relacionados, calificación
 * e información descriptiva del alojamiento.
 */
export class Reservation {
  /**
   * Constructor de la clase Reservation.
   * @param checkIn Fecha de entrada (check-in).
   * @param checkOut Fecha de salida (check-out).
   * @param numberGuests Número de personas que harán la reserva.
   * @param state Estado de la reserva (pendiente, confirmada, cancelada, etc.).
   * @param accommodationsId ID del alojamiento reservado.
   * @param usersId ID del usuario que realiza la reserva.
   * @param hostsId ID del anfitrión propietario del alojamiento.
   * @param calification Calificación de la reserva (inicialmente 0).
   * @param img URL o ruta de la imagen principal del alojamiento.
   * @param name Nombre del alojamiento reservado.
   * @param city Ciudad donde se encuentra el alojamiento.
   * @param id ID opcional de la reserva (útil para edición o referencia en la BD).
   * @param createdAt Fecha de creación de la reserva (opcional, generalmente asignada por el servidor).
   * @param updatedAt Fecha de última actualización de la reserva (opcional, generalmente asignada por el servidor).
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
    public imgUrl: string,
    public detailedDescription: string,
    public cityName: string,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}