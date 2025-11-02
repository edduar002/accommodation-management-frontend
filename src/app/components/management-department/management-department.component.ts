import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city', // Selector del componente para usarlo en templates
  standalone: true, // Indica que el componente es autónomo (no necesita módulo)
  imports: [CommonModule, RouterLink], // Módulos importados para este componente
  templateUrl: './management-department.component.html', // Template HTML asociado
  styleUrls: ['./management-department.component.css'], // Estilos CSS asociados
  providers: [DepartmentService], // Servicios proporcionados por el componente
})
export class ManagementDepartmentComponent implements OnInit {
  // Arreglo que almacenará todos los departamentos obtenidos
  departments: Department[] = [];

  // Variable para almacenar temporalmente el ID del departamento seleccionado para eliminar
  selectedCityId?: number;

  /**
   * Constructor del componente
   * @param http - Cliente HTTP para realizar peticiones
   * @param _departmentService - Servicio de departamentos para operaciones CRUD
   */
  constructor(
    private http: HttpClient,
    private _departmentService: DepartmentService
  ) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Aquí se carga la lista de departamentos
   */
  ngOnInit(): void {
    // Llamada al método que obtiene todos los departamentos
    this.getAll();
  }

  /**
   * Obtiene todos los departamentos desde el servicio
   * Suscribe a la respuesta para manejar los datos o errores
   */
  getAll(): void {
    // Llamada al servicio para obtener todos los departamentos
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        // Se asigna la respuesta al arreglo de departamentos
        this.departments = response;
      },
      error: (error) => {
        // En caso de error, se muestra en consola
        console.error('Error al obtener departamentos:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación de eliminación
   * @param id - ID del departamento que se desea eliminar
   */
  openDeleteModal(id?: number) {
    // Si no se proporciona un ID, se retorna y no hace nada
    if (!id) return;

    // Se asigna el ID seleccionado para eliminar
    this.selectedCityId = id;
  }

  /**
   * Confirma la eliminación del departamento seleccionado
   * Llama al servicio para eliminar y recarga la lista
   */
  confirmDelete() {
    // Si no hay un departamento seleccionado, no hace nada
    if (!this.selectedCityId) return;

    // Llamada al servicio para eliminar el departamento por ID
    this._departmentService.delete(this.selectedCityId).subscribe({
      next: () => {
        // Una vez eliminado, se recarga la lista de departamentos
        this.getAll();

        // Se limpia la variable del ID seleccionado
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error), // Muestra error en consola si ocurre
    });
  }
}