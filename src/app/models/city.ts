/**
 * Clase que representa una ciudad dentro del sistema
 */
export class City {
  /**
   * Constructor de la clase City
   * @param name Nombre de la ciudad
   * @param departmentsId ID del departamento al que pertenece la ciudad
   * @param departmentName Nombre del departamento (para mostrar en la UI)
   * @param active Indica si la ciudad está activa en el sistema
   * @param id ID opcional de la ciudad (para edición o BD)
   */
  constructor(
    public name: string,
    public departmentsId: number,
    public departmentName: string,
    public active: boolean,
    public id?: number
  ) {}
}