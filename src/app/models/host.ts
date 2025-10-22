export class Host {
  constructor(
    private name: string,
    private surname: string,
    private email: string,
    private password: string,
    private phone: string,
    private birthday: Date,
    private imgUrl: string,
    private rolesId: number,
    private personalDescription: string,
    private departmentsId: number
  ) {}
}