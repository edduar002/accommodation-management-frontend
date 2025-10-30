export class User {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public phone: string,
    public birthday: Date,
    public imgUrl: string,
    public rolesId: number,
    public departmentId: number,
    public citiesId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public active: boolean,
    public id?:number
  ) {}
}