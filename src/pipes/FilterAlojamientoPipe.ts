import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para filtrar una lista de alojamientos según un texto de búsqueda.
 * Permite buscar por descripción, ciudad o departamento de cada alojamiento.
 */
@Pipe({
  name: 'filterAlojamiento',
  standalone: true
})
export class FilterAlojamientoPipe implements PipeTransform {

  /**
   * Método que transforma la lista de alojamientos filtrándola según el texto ingresado.
   * @param items Array de alojamientos a filtrar.
   * @param searchText Texto que se usará para filtrar los alojamientos.
   * @returns Array filtrado de alojamientos que coinciden con el texto de búsqueda.
   */
  transform(items: any[], searchText: string): any[] {
    // Si no hay elementos en la lista, retornar array vacío
    if (!items) return [];

    // Si no hay texto de búsqueda, retornar todos los elementos
    if (!searchText) return items;

    // Convertir el texto de búsqueda a minúsculas para hacer una búsqueda insensible a mayúsculas
    searchText = searchText.toLowerCase();

    // Filtrar la lista de alojamientos
    return items.filter(item =>
      // Buscar coincidencias en la descripción detallada
      item.detailedDescription.toLowerCase().includes(searchText) ||
      // Buscar coincidencias en el nombre de la ciudad (si existe)
      item.cityName?.toLowerCase().includes(searchText) ||
      // Buscar coincidencias en el nombre del departamento (si existe)
      item.departmentName?.toLowerCase().includes(searchText)
    );
  }
}