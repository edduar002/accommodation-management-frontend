import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css',
  providers: [RoleService], // Servicio inyectado para manejar roles
})
export class CreateRoleComponent {
  public role: Role; // Objeto que representa el rol que se va a crear

  /**
   * Constructor del componente
   * @param _roleService Servicio para operaciones de roles
   * @param router Para navegación entre rutas
   */
  constructor(private _roleService: RoleService, private router: Router) {
    // Inicializa el objeto role con valores por defecto
    this.role = new Role('', true);
  }

  /**
   * Método que se ejecuta al enviar el formulario
   * @param form Formulario Angular
   */
  onSubmit(form: NgForm): void {
    // Asegura que el rol esté activo
    this.role.active = true;

    // Llama al servicio para registrar el rol
    this._roleService.register(this.role).subscribe({
      next: (response) => {

        // Mostrar el modal de éxito si se crea correctamente
        const modalEl = document.getElementById('successModal');
        if (modalEl && (window as any).bootstrap?.Modal) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        // Limpia el formulario después del registro exitoso
        form.resetForm();
      },
      error: (error) => {
        // Muestra en consola cualquier error ocurrido durante la creación
        console.error('Error al crear rol:', error);
      },
    });
  }

  /**
   * Cierra el modal de éxito y navega a la página de gestión de roles
   */
  closeModal(): void {
    // Obtener el elemento del modal
    const modalEl = document.getElementById('successModal');

    // Verifica si existe el modal y si Bootstrap Modal está disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      // Obtener instancia del modal y ocultarlo
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();

      // Eliminar clases y elementos de fondo del modal
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Redirigir a la ruta de gestión de roles
    this.router.navigate(['/managementRole']);
  }
}