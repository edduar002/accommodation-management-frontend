import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-user', // Selector del componente para usarlo en templates
  standalone: true, // Indica que el componente es autónomo (no necesita módulo)
  imports: [CommonModule], // Módulos importados para este componente
  templateUrl: './management-user.component.html', // Template HTML asociado
  styleUrls: ['./management-user.component.css'], // Estilos CSS asociados
  providers: [UserService], // Servicios proporcionados por el componente
})
export class ManagementUserComponent implements OnInit {
  // Arreglo que almacenará todos los usuarios obtenidos
  users: User[] = [];

  // Variable para almacenar temporalmente el ID del usuario seleccionado para eliminar
  selectedCityId?: number;

  /**
   * Constructor del componente
   * @param http - Cliente HTTP para realizar peticiones
   * @param _userService - Servicio de usuarios para operaciones CRUD
   */
  constructor(private http: HttpClient, private _userService: UserService) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   * Aquí se carga la lista de usuarios
   */
  ngOnInit(): void {
    // Llamada al método que obtiene todos los usuarios
    this.getAll();
  }

  /**
   * Obtiene todos los usuarios desde el servicio
   * Suscribe a la respuesta para manejar los datos o errores
   */
  getAll(): void {
    // Llamada al servicio para obtener todos los usuarios
    this._userService.getAll().subscribe({
      next: (response: any) => {
        // Se asigna la respuesta al arreglo de usuarios
        this.users = response;
      },
      error: (error) => {
        // En caso de error, se muestra en consola
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  /**
   * Abre el modal de confirmación de eliminación
   * @param id - ID del usuario que se desea eliminar
   */
  openDeleteModal(id?: number) {
    // Si no se proporciona un ID, se retorna y no hace nada
    if (!id) return;

    // Se asigna el ID seleccionado para eliminar
    this.selectedCityId = id;
  }

  /**
   * Confirma la eliminación del usuario seleccionado
   * Llama al servicio para eliminar y recarga la lista
   */
  confirmDelete() {
    // Si no hay un usuario seleccionado, no hace nada
    if (!this.selectedCityId) return;

    // Llamada al servicio para eliminar el usuario por ID
    this._userService.delete(this.selectedCityId).subscribe({
      next: () => {
        // Una vez eliminado, se recarga la lista de usuarios
        this.getAll();

        // Se limpia la variable del ID seleccionado
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error), // Muestra error en consola si ocurre
    });
  }
}