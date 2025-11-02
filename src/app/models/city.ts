export class City {
  constructor(
    public name: string,
    public departmentsId: number,
    public departmentName: string,
    public active: boolean,
    public id?: number
  ) {}
}
