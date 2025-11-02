export class RecoveryPassword {
  constructor(
    public newPassword: string,
    public oldPassword: string,
    public id?: number
  ) {}
}
