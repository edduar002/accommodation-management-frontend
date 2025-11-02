/**
 * Clase que representa un anfitrión dentro del sistema
 */
export class Host {
  /**
   * Constructor de la clase Host
   * @param name Nombre del anfitrión
   * @param surname Apellido del anfitrión
   * @param email Correo electrónico del anfitrión
   * @param password Contraseña del anfitrión
   * @param phone Teléfono de contacto
   * @param birthday Fecha de nacimiento
   * @param imgUrl URL de la imagen del perfil del anfitrión
   * @param rolesId ID del rol asignado (ej. anfitrión)
   * @param personalDescription Breve descripción personal del anfitrión
   * @param departmentsId ID del departamento de residencia
   * @param citiesId ID de la ciudad de residencia
   * @param departmentName Nombre del departamento (para mostrar en UI)
   * @param cityName Nombre de la ciudad (para mostrar en UI)
   * @param active Indica si el anfitrión está activo en el sistema
   * @param id ID opcional del anfitrión (para edición o BD)
   */
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public phone: string,
    public birthday: Date,
    public imgUrl: string,
    public rolesId: number,
    public personalDescription: string,
    public departmentsId: number,
    public citiesId: number,
    public departmentName: string,
    public cityName: string,
    public active: boolean,
    public id?: number
  ) {}
}