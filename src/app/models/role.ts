/**
 * Clase que representa un rol de usuario dentro del sistema
 */
export class Role {
  /**
   * Constructor de la clase Role
   * @param name Nombre del rol (por ejemplo, "Administrador", "Usuario", "Anfitrión")
   * @param active Indica si el rol está activo o deshabilitado en el sistema
   * @param id ID opcional del rol (para persistencia en la base de datos)
   */
  constructor(
    public name: string,
    public active: boolean,
    public id?: number
  ) {}
}