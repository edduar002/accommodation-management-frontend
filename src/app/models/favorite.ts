export class Favorite {
  constructor(
    public active: boolean,
    public userId: number,
    public accommodationId: number,
    public id?: number
  ) {}
}