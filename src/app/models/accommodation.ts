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
    public citiesId: number,
    public departmentName: string,
    public cityName: string,
    public active: boolean,
    public services: string,
    public imgUrl: string,
    public latitude?: string,   // ✅ Agregado
    public longitude?: string,  // ✅ Agregado
    public id?: number
  ) {}
}