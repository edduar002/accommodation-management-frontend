/**
 * Clase que representa un comentario realizado por un usuario sobre un alojamiento
 */
export class Comment {
  /**
   * Constructor de la clase Comment
   * @param content Contenido del comentario
   * @param date Fecha en la que se realizó el comentario
   * @param accommodationsId ID del alojamiento al que pertenece el comentario
   * @param usersId ID del usuario que realizó el comentario
   * @param userName Nombre del usuario que realizó el comentario (para mostrar en UI)
   * @param id ID opcional del comentario (para edición o BD)
   */
  constructor(
    public content: string,
    public date: Date,
    public accommodationsId: number,
    public usersId: number,
    public userName: string,
    public id?: number
  ) {}
}