import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css',
  providers: [DepartmentService], // Servicio inyectado para manejar departamentos
})
export class CreateDepartmentComponent {
  public department: Department; // Objeto que representa el departamento que se va a crear

  /**
   * Constructor del componente
   * @param _departmentService Servicio para operaciones de departamentos
   * @param router Para navegación entre rutas
   */
  constructor(
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    // Inicializa el objeto department con valores por defecto
    this.department = new Department('', true);
  }

  /**
   * Método que se ejecuta al enviar el formulario
   * @param form Formulario Angular
   */
  onSubmit(form: NgForm): void {
    // Asegura que el departamento esté activo
    this.department.active = true;

    // Llama al servicio para registrar el departamento
    this._departmentService.register(this.department).subscribe({
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
        console.error('Error al crear departamento:', error);
      },
    });
  }

  /**
   * Cierra el modal de éxito y navega a la página de gestión de departamentos
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

    // Redirigir a la ruta de gestión de departamentos
    this.router.navigate(['/managementDepartment']);
  }
}