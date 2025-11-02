/**
 * Clase que representa un usuario en la plataforma
 */
export class User {
  /**
   * Constructor de la clase User
   * @param name Nombre del usuario
   * @param surname Apellido del usuario
   * @param email Correo electrónico del usuario
   * @param password Contraseña del usuario
   * @param phone Teléfono de contacto
   * @param birthday Fecha de nacimiento del usuario
   * @param imgUrl URL de la imagen del perfil del usuario
   * @param rolesId ID del rol asignado al usuario (por ejemplo, 2 = Usuario)
   * @param departmentId ID del departamento de residencia
   * @param citiesId ID de la ciudad de residencia
   * @param departmentName Nombre del departamento (para mostrar en la UI)
   * @param cityName Nombre de la ciudad (para mostrar en la UI)
   * @param createdAt Fecha de creación del usuario
   * @param updatedAt Fecha de la última actualización de datos
   * @param active Indica si el usuario está activo o deshabilitado
   * @param id ID opcional del usuario (para persistencia en BD)
   * @param file Archivo opcional para manejar la imagen local antes de subirla
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
    public departmentId: number,
    public citiesId: number,
    public departmentName: string,
    public cityName: string,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean,
    public id?: number,
    public file?: File // Archivo temporal para subir imagen
  ) {}
}