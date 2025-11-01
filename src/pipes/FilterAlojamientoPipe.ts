import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlojamiento',
  standalone: true
})
export class FilterAlojamientoPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.detailedDescription.toLowerCase().includes(searchText) ||
      item.cityName?.toLowerCase().includes(searchText) ||
      item.departmentName?.toLowerCase().includes(searchText)
    );
  }
}
