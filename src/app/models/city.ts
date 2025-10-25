export class City {
  constructor(
    public name: string,
    public departmentsId: number,
    public active: boolean,
    public id?: number
  ) {}
}