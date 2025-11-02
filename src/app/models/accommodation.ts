/**
 * Clase que representa un alojamiento dentro del sistema
 */
export class Accommodation {
  /**
   * Constructor de la clase Accommodation
   * @param detailedDescription Descripción detallada del alojamiento
   * @param direction Dirección general del alojamiento
   * @param exactLocation Ubicación exacta (ej. coordenadas o referencia)
   * @param price Precio por noche o unidad de alojamiento
   * @param maximumCapacity Capacidad máxima de personas
   * @param hostsId ID del anfitrión propietario del alojamiento
   * @param available Indica si el alojamiento está disponible para reservas
   * @param qualificationsId ID de la calificación asociada al alojamiento
   * @param departmentsId ID del departamento donde se encuentra
   * @param citiesId ID de la ciudad donde se encuentra
   * @param departmentName Nombre del departamento (para mostrar en UI)
   * @param cityName Nombre de la ciudad (para mostrar en UI)
   * @param active Indica si el alojamiento está activo en el sistema
   * @param services Servicios ofrecidos por el alojamiento (ej. WiFi, desayuno)
   * @param imgUrl URL de la imagen principal del alojamiento
   * @param id ID opcional del alojamiento (para casos de edición o BD)
   */
  constructor(
    public detailedDescription: string,
    public direction: string,
    public exactLocation: string,
    public price: number,
    public maximumCapacity: number,
    public hostsId: number,
    public available: boolean,
    public qualificationsId: number,
    public departmentsId: number,
    public citiesId: number,
    public departmentName: string,
    public cityName: string,
    public active: boolean,
    public services: string,
    public imgUrl: string,
    public id?: number
  ) {}
}