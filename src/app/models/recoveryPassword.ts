/**
 * Clase que representa la información necesaria para la recuperación o cambio de contraseña
 */
export class RecoveryPassword {
  /**
   * Constructor de la clase RecoveryPassword
   * @param newPassword Nueva contraseña que se desea establecer
   * @param oldPassword Contraseña actual o anterior (para validación)
   * @param id ID opcional del usuario asociado al cambio de contraseña
   */
  constructor(
    public newPassword: string,
    public oldPassword: string,
    public id?: number
  ) {}
}