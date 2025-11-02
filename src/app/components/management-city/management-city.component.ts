import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-city.component.html',
  styleUrls: ['./management-city.component.css'],
  providers: [CityService],
})
export class ManagementCityComponent implements OnInit {
  // Array que almacena todas las ciudades
  cities: City[] = [];

  // ID de la ciudad seleccionada para eliminar
  selectedCityId?: number;

  constructor(private http: HttpClient, private _cityService: CityService) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Llama a la función para obtener todas las ciudades
   */
  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todas las ciudades desde el servicio
   * Suscribe a la respuesta y maneja errores
   */
  getAll(): void {
    this._cityService.getAll().subscribe({
      next: (response: any) => {
        // Guardar las ciudades obtenidas en el array
        this.cities = response;
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      },
    });
  }

  /**
   * Asignar el ID de la ciudad seleccionada al abrir el modal de eliminación
   * @param id ID de la ciudad
   */
  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  /**
   * Confirmar eliminación de la ciudad seleccionada
   * Llama al servicio para eliminar y luego actualiza la lista
   */
  confirmDelete() {
    if (!this.selectedCityId) return;
    this._cityService.delete(this.selectedCityId).subscribe({
      next: () => {
        // Actualizar lista de ciudades después de eliminar
        this.getAll();
        // Limpiar el ID seleccionado
        this.selectedCityId = undefined;
      },
      error: (error) => console.error('Error al eliminar ciudad:', error),
    });
  }
}