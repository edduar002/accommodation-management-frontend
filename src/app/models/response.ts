/**
 * Clase que representa una respuesta a un comentario en la plataforma
 */
export class Response {
  /**
   * Constructor de la clase Response
   * @param content Contenido textual de la respuesta
   * @param hostsId ID del anfitrión que responde
   * @param date Fecha en que se realizó la respuesta
   * @param hostName Nombre del anfitrión (para mostrar en la UI)
   * @param commentsId ID del comentario al que se responde (opcional)
   * @param id ID opcional de la respuesta (para persistencia en BD)
   */
  constructor(
    public content: string,
    public hostsId: number,
    public date: Date,
    public hostName: string,
    public commentsId?: number,
    public id?: number
  ) {}
}