export class Comment {
  constructor(
    public content: string,
    public accommodationsId: number,
    public usersId: number,
    public id?:number
  ) {}
}