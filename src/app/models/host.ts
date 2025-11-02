export class Host {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public phone: string,
    public birthday: Date,
    public imgUrl: string,
    public rolesId: number,
    public personalDescription: string,
    public departmentsId: number,
    public citiesId: number,
    public departmentName: string,
    public cityName: string,
    public active: boolean,
    public id?: number
  ) {}
}
