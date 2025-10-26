import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css',
  providers: [HostService, DepartmentService],
})
export class RegisterHostComponent {
  public host: Host;
  departamentos: Department[] = [];
  public errorMessage: string = '';

  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    this.host = new Host('', '', '', '', '', new Date(), '', 1, '', 1);
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departamentos = response;
      },
      error: (error) => {
        console.error('Error al obtener departamentos:', error);
      },
    });
  }

  onSubmit(form: NgForm): void {
    this.host.rolesId = 2;
    this.host.departmentsId = Number(this.host.departmentsId);

    this._hostService.register(this.host).subscribe({
      next: (response) => {
        console.log('Anfitrión registrado:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al registrar anfitrión:', error);

        // 🧩 Detectar error de correo duplicado (MySQL UNIQUE)
        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409
        ) {
          this.errorMessage = 'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        this.showModal('errorModal');
      },
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
    this.router.navigate(['/login']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}