export class Response {
  constructor(
    public content: string,
    public hostsId: number,
    public date: Date,
    public commentsId?: number,
    public id?:number
  ) {}
}