import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdministratorService } from '../../services/administrator.service';
import { Administrator } from '../../models/administrator';

// Declaración de la variable global de Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.css'],
  providers: [AdministratorService],
})
export class EditProfileAdminComponent implements OnInit, AfterViewInit {
  
  // Administrador actual que se está editando
  public admin: Administrator;
  
  // Mensaje de error mostrado en el modal
  public errorMessage: string = '';

  // Referencias a los modales de éxito y error de Bootstrap
  private successModal: any;
  private errorModal: any;

  /**
   * Constructor del componente
   * @param _adminService Servicio para manejar datos del administrador
   * @param _route Para acceder a parámetros de la ruta
   * @param _router Para navegar entre rutas
   */
  constructor(
    private _adminService: AdministratorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa un administrador vacío con valores predeterminados
    this.admin = new Administrator('', '', '', '', 1);
  }

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Se utiliza para cargar los datos del administrador
   */
  ngOnInit(): void {
    // Llama al método para obtener la información del administrador
    this.getOne();
  }

  /**
   * Método de Angular que se ejecuta después de que la vista se haya inicializado
   * Se utiliza para inicializar los modales de Bootstrap
   */
  ngAfterViewInit(): void {
    // Inicializa el modal de éxito
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );

    // Inicializa el modal de error
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Obtener datos de un administrador específico
   */
  getOne(): void {
    // Suscribirse a los parámetros de la ruta
    this._route.params.subscribe((params) => {
      // Obtener el id del administrador de los parámetros de la ruta
      const id = +params['id'];

      // Llamar al servicio para obtener los datos del administrador por id
      this._adminService.getOne(id).subscribe(
        (response) => {
          // Asignar la respuesta al objeto admin
          this.admin = response;
        },
        (error) => {
          // Mostrar error en consola si falla la carga
          console.error('Error al cargar administrador:', error);
          // Redirigir al inicio si hay error
          this._router.navigate(['/']);
        }
      );
    });
  }

  /**
   * Guardar cambios realizados en el administrador
   * @param form Formulario que se está enviando
   */
  onSubmit(form: NgForm): void {
    // Verificar si el formulario es válido
    if (!form.valid) {
      // Asignar mensaje de error y mostrar modal
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      this.errorModal.show();
      return;
    }

    // Llamar al servicio para actualizar los datos del administrador
    this._adminService.update(this.admin.id!, this.admin).subscribe(
      (response) => {
        // Mostrar modal de éxito al completar la actualización
        this.successModal.show();
      },
      (error) => {
        // Asignar mensaje de error y mostrar modal
        this.errorMessage =
          'Error al actualizar el perfil del administrador. Intenta nuevamente.';
        this.errorModal.show();
      }
    );
  }

  /**
   * Cerrar el modal de éxito y redirigir a la página principal
   */
  closeModal(): void {
    // Ocultar el modal de éxito
    this.successModal.hide();
    // Redirigir a la página de inicio
    this._router.navigate(['/']);
  }
}