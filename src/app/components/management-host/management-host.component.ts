import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-host', // Selector del componente para usarlo en templates
  standalone: true, // Indica que el componente es autónomo (no necesita módulo)
  imports: [CommonModule], // Módulos importados para este componente
  templateUrl: './management-host.component.html', // Template HTML asociado
  styleUrls: ['./management-host.component.css'], // Estilos CSS asociados
  providers: [HostService], // Servicios proporcionados por el componente
})
export class ManagementHostComponent implements OnInit {
  // Arreglo que almacenará todos los anfitriones obtenidos
  hosts: Host[] = [];

  // Variable para almacenar temporalmente el ID del anfitrión seleccionado para eliminar
  selectedCityId?: number;

  /**
   * Constructor del componente
   * @param http - Cliente HTTP para realizar peticiones
   * @param _hostService - Servicio de anfitriones para operaciones CRUD
   */
  constructor(private http: HttpClient, private _hostService: HostService) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Aquí se carga la lista de anfitriones
   */
  ngOnInit(): void {
    // Llamada al método que obtiene todos los anfitriones
    this.getAll();
  }

  /**
   * Obtiene todos los anfitriones desde el servicio
   * Suscribe a la respuesta para manejar los datos o errores
   */
  getAll(): void {
    // Llamada al servicio para obtener todos los anfitriones
    this._hostService.getAll().subscribe({
      next: (response: any) => {
        // Se asigna la respuesta al arreglo de anfitriones
        this.hosts = response;
      },
      error: (error) => {
        // En caso de error, se muestra en consola
        console.error('Error al obtener anfitriones:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación de eliminación
   * @param id - ID del anfitrión que se desea eliminar
   */
  openDeleteModal(id?: number) {
    // Si no se proporciona un ID, se retorna y no hace nada
    if (!id) return;

    // Se asigna el ID seleccionado para eliminar
    this.selectedCityId = id;
  }

  /**
   * Confirma la eliminación del anfitrión seleccionado
   * Llama al servicio para eliminar y recarga la lista
   */
  confirmDelete() {
    // Si no hay un anfitrión seleccionado, no hace nada
    if (!this.selectedCityId) return;

    // Llamada al servicio para eliminar el anfitrión por ID
    this._hostService.delete(this.selectedCityId).subscribe({
      next: () => {
        // Una vez eliminado, se recarga la lista de anfitriones
        this.getAll();

        // Se limpia la variable del ID seleccionado
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error), // Muestra error en consola si ocurre
    });
  }
}