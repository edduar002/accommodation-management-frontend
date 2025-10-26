export class Administrator {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public rolesId: number
  ) {}
}