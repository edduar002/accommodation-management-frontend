import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

// Declaración de variable global para Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [RoleService],
})
export class EditRoleComponent implements OnInit, AfterViewInit {

  // Objeto rol a editar
  public role: Role;

  // Mensaje de error mostrado en modal
  public errorMessage: string = '';

  // Referencias a modales de Bootstrap
  private successModal: any;
  private errorModal: any;

  /**
   * Constructor del componente
   * @param _roleService Servicio para obtener y actualizar roles
   * @param _route Para obtener parámetros de la ruta
   * @param _router Para navegar entre rutas
   */
  constructor(
    private _roleService: RoleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa rol vacío con nombre vacío y activo por defecto
    this.role = new Role('', true);
  }

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Llama a getOne() para cargar los datos del rol
   */
  ngOnInit(): void {
    this.getOne();
  }

  /**
   * Método de Angular que se ejecuta después de inicializar la vista
   * Se utiliza para inicializar los modales de Bootstrap
   */
  ngAfterViewInit(): void {
    // Modal de éxito
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );

    // Modal de error
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Obtener información de un rol específico
   */
  getOne(): void {
    // Suscribirse a parámetros de la ruta
    this._route.params.subscribe((params) => {
      const id = +params['id']; // Convertir ID a número

      // Obtener rol por ID
      this._roleService.getOne(id).subscribe(
        (response) => {
          // Asignar rol recibido del servicio
          this.role = response;
        },
        (error) => {
          console.error('Error al cargar rol:', error);
          // Redirigir a gestión de roles en caso de error
          this._router.navigate(['/managementRole']);
        }
      );
    });
  }

  /**
   * Guardar cambios realizados en el rol
   * @param form Formulario a enviar
   */
  onSubmit(form: NgForm): void {
    // Validar formulario
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.errorModal.show();
      return;
    }

    // Actualizar rol mediante el servicio
    this._roleService.update(this.role.id!, this.role).subscribe(
      (response) => this.successModal.show(), // Mostrar modal de éxito
      (error) => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show(); // Mostrar modal de error
      }
    );
  }

  /**
   * Cerrar modal de éxito y redirigir a la página de gestión de roles
   */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementRole']);
  }
}