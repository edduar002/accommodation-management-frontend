import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.service';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-management-accommodations', // Selector del componente
  standalone: true, // Componente autónomo
  imports: [CommonModule, RouterLink], // Módulos importados
  templateUrl: './my-accommodations.component.html', // Template HTML
  styleUrls: ['./my-accommodations.component.css'], // Estilos CSS
  providers: [AccommodationService], // Servicio proporcionado
})
export class MyAccommodationsComponent implements OnInit {
  // Arreglo que almacenará los alojamientos del usuario
  accommodations: Accommodation[] = [];

  // Variable para almacenar temporalmente el ID del alojamiento seleccionado para eliminar
  selectedAccommodationId?: number;

  /**
   * Constructor del componente
   * @param http - Cliente HTTP para realizar peticiones
   * @param _accommodationService - Servicio de alojamientos para operaciones CRUD
   */
  constructor(
    private http: HttpClient,
    private _accommodationService: AccommodationService,
    private _hostService: HostService
  ) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Aquí se carga la lista de alojamientos del usuario
   */
  ngOnInit(): void {
    // Llamada al método que obtiene todos los alojamientos del usuario
    this.getAll();
  }

  /**
   * Obtiene todos los alojamientos asociados al anfitrión actual.
   * Primero valida si el anfitrión está disponible en el servicio.
   * Si el ID existe, realiza la petición al backend para obtener los alojamientos.
   * Si el usuario no está identificado correctamente, muestra un error en consola.
   */
  getAll(): void {
    // Obtener el anfitrión almacenado en el servicio
    const host = this._hostService.getHost();

    // Validar si el ID del anfitrión existe
    if (!host || host.id === undefined) {
      console.error('No se pudo obtener el ID del anfitrión.');
      return; // Detener ejecución si no existe el ID
    }

    // Llamada al servicio para obtener alojamientos del anfitrión
    this._accommodationService.getAllOwn(host.id).subscribe({
      next: (response: any) => {
        // Asignar respuesta a la lista de alojamientos
        this.accommodations = response;
      },
      error: (error) => {
        // Mostrar el error en consola si ocurre
        console.error('Error al obtener alojamientos:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación de eliminación
   * @param id - ID del alojamiento que se desea eliminar
   */
  openDeleteModal(id?: number): void {
    // Si no se proporciona un ID, se retorna y no hace nada
    if (!id) return;

    // Se asigna el ID seleccionado para eliminar
    this.selectedAccommodationId = id;
  }

  /**
   * Confirma la eliminación del alojamiento seleccionado
   * Llama al servicio para eliminar y recarga la lista
   */
  confirmDelete(): void {
    // Si no hay un alojamiento seleccionado, no hace nada
    if (!this.selectedAccommodationId) return;

    // Llamada al servicio para eliminar el alojamiento por ID
    this._accommodationService.delete(this.selectedAccommodationId).subscribe({
      next: () => {
        // Una vez eliminado, se recarga la lista de alojamientos
        this.getAll();

        // Se limpia la variable del ID seleccionado
        this.selectedAccommodationId = undefined;
      },
      error: (error) => {
        // Muestra error en consola si ocurre
        console.error('Error al eliminar alojamiento:', error);
      },
    });
  }
}
