import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.service';

/**
 * Componente ManagementAccommodationsComponent
 * Permite gestionar los alojamientos registrados en la plataforma.
 * Funciones principales:
 * - Listar todos los alojamientos.
 * - Abrir modal de confirmación para eliminar un alojamiento.
 * - Eliminar alojamiento seleccionado.
 */
@Component({
  selector: 'app-management-accommodations',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule para directivas de Angular
  templateUrl: './management-accommodations.component.html',
  styleUrls: ['./management-accommodations.component.css'],
  providers: [AccommodationService], // Servicio para manejar alojamientos
})
export class ManagementAccommodationsComponent implements OnInit {
  // Lista de alojamientos obtenida desde el backend
  accommodations: Accommodation[] = [];

  // ID del alojamiento seleccionado para eliminación
  selectedAccommodationId?: number;

  /**
   * Constructor del componente
   * @param http Cliente HTTP para peticiones
   * @param _accommodationService Servicio para gestión de alojamientos
   */
  constructor(
    private http: HttpClient,
    private _accommodationService: AccommodationService
  ) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.getAll(); // Cargar todos los alojamientos al iniciar el componente
  }

  /**
   * Obtiene todos los alojamientos registrados desde el backend
   */
  getAll(): void {
    this._accommodationService.getAll().subscribe({
      next: (response: any) => {
        this.accommodations = response; // Guardar alojamientos en la variable
      },
      error: (error) => {
        console.error('Error al obtener alojamientos:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación para eliminar un alojamiento
   * @param id ID del alojamiento seleccionado
   */
  openDeleteModal(id?: number): void {
    if (!id) return; // Verificar que se recibió un ID válido
    this.selectedAccommodationId = id; // Guardar ID del alojamiento a eliminar
  }

  /**
   * Confirma y realiza la eliminación del alojamiento seleccionado
   */
  confirmDelete(): void {
    if (!this.selectedAccommodationId) return; // Validar que haya un alojamiento seleccionado
    this._accommodationService.delete(this.selectedAccommodationId).subscribe({
      next: () => {
        this.getAll(); // Recargar la lista de alojamientos después de eliminar
        this.selectedAccommodationId = undefined; // Limpiar la selección
      },
      error: (error) => {
        console.error('Error al eliminar alojamiento:', error);
      },
    });
  }
}