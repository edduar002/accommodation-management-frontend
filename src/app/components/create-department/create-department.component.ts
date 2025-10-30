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
  providers: [DepartmentService]
})
export class CreateDepartmentComponent {
  public department: Department;

  constructor(
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    this.department = new Department('', true);
  }

  onSubmit(form: NgForm): void {
    this.department.active = true;

    this._departmentService.register(this.department).subscribe({
      next: (response) => {
        console.log('Departamento creado:', response);

        //Mostrar modal al éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl && (window as any).bootstrap?.Modal) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm();
      },
      error: (error) => {
        console.error('Error al crear departamento:', error);
      }
    });
  }

  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    //Redirigir tras cerrar el modal
    this.router.navigate(['/managementDepartment']);
  }
}