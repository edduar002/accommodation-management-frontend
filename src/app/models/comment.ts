export class Comment {
  constructor(
    public content: string,
    public date: Date,
    public accommodationsId: number,
    public usersId: number,
    public userName: string,
    public id?:number
  ) {}
}