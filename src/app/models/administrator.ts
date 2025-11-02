/**
 * Clase que representa un administrador dentro del sistema
 */
export class Administrator {
  /**
   * Constructor de la clase Administrator
   * @param name Nombre del administrador
   * @param surname Apellido del administrador
   * @param email Correo electrónico del administrador
   * @param password Contraseña del administrador
   * @param rolesId ID del rol del administrador (generalmente fijo)
   * @param id ID opcional del administrador (para edición o BD)
   */
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public rolesId: number,
    public id?: number
  ) {}
}