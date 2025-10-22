export class Accommodation {
  constructor(
    private detailedDescription: string,
    private direction: string,
    private exactLocation: string,
    private price: number,
    private maximumCapacity: number,
    private hostsId: number,
    private available: boolean,
    private qualificationsId: number,
    private departmentsId: number
  ) {}
}