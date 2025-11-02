export class Response {
  constructor(
    public content: string,
    public hostsId: number,
    public date: Date,
    public hostName: string,
    public commentsId?: number,
    public id?: number
  ) {}
}
