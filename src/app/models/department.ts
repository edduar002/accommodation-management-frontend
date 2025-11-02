/**
 * Clase que representa un departamento dentro del sistema
 */
export class Department {
  /**
   * Constructor de la clase Department
   * @param name Nombre del departamento
   * @param active Indica si el departamento está activo en el sistema
   * @param id ID opcional del departamento (para edición o BD)
   */
  constructor(
    public name: string,
    public active: boolean,
    public id?: number
  ) {}
}