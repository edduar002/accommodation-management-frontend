export class User {
  constructor(
    private name: string,
    private surname: string,
    private email: string,
    private password: string,
    private phone: string,
    private birthday: Date,
    private imgUrl: string,
    private rolesId: number,
    private departmentId: number,
    private createdAt: Date,
    private updatedAt: Date,
    private active: boolean
  ) {}
}