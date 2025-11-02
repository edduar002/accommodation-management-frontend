import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city', // Selector del componente para usarlo en templates
  standalone: true, // Indica que el componente es autónomo (no necesita módulo)
  imports: [CommonModule, RouterLink], // Módulos importados para este componente
  templateUrl: './management-role.component.html', // Template HTML asociado
  styleUrls: ['./management-role.component.css'], // Estilos CSS asociados
  providers: [RoleService], // Servicios proporcionados por el componente
})
export class ManagementRoleComponent implements OnInit {
  // Arreglo que almacenará todos los roles obtenidos
  roles: Role[] = [];

  // Variable para almacenar temporalmente el ID del rol seleccionado para eliminar
  selectedCityId?: number;

  /**
   * Constructor del componente
   * @param http - Cliente HTTP para realizar peticiones
   * @param _roleService - Servicio de roles para operaciones CRUD
   */
  constructor(private http: HttpClient, private _roleService: RoleService) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Aquí se carga la lista de roles
   */
  ngOnInit(): void {
    // Llamada al método que obtiene todos los roles
    this.getAll();
  }

  /**
   * Obtiene todos los roles desde el servicio
   * Suscribe a la respuesta para manejar los datos o errores
   */
  getAll(): void {
    // Llamada al servicio para obtener todos los roles
    this._roleService.getAll().subscribe({
      next: (response: any) => {
        // Se asigna la respuesta al arreglo de roles
        this.roles = response;
      },
      error: (error) => {
        // En caso de error, se muestra en consola
        console.error('Error al obtener roles:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación de eliminación
   * @param id - ID del rol que se desea eliminar
   */
  openDeleteModal(id?: number) {
    // Si no se proporciona un ID, se retorna y no hace nada
    if (!id) return;

    // Se asigna el ID seleccionado para eliminar
    this.selectedCityId = id;
  }

  /**
   * Confirma la eliminación del rol seleccionado
   * Llama al servicio para eliminar y recarga la lista
   */
  confirmDelete() {
    // Si no hay un rol seleccionado, no hace nada
    if (!this.selectedCityId) return;

    // Llamada al servicio para eliminar el rol por ID
    this._roleService.delete(this.selectedCityId).subscribe({
      next: () => {
        // Una vez eliminado, se recarga la lista de roles
        this.getAll();

        // Se limpia la variable del ID seleccionado
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error), // Muestra error en consola si ocurre
    });
  }
}