export class Accommodation {
  constructor(
    public detailedDescription: string,
    public direction: string,
    public exactLocation: string,
    public price: number,
    public maximumCapacity: number,
    public hostsId: number,
    public available: boolean,
    public qualificationsId: number,
    public departmentsId: number,
    public active: boolean,
    public id?:number
  ) {}
}