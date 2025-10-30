import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';
import { PasswordUtilsService } from '../../core/utils/password-utils.service';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css',
  providers: [HostService, DepartmentService, CityService],
})
export class RegisterHostComponent {
  public host: Host;
  departamentos: Department[] = [];
  ciudades: City[] = [];
  public errorMessage: string = '';
  idPosicion: string = '';

  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private router: Router,
    private passwordUtils: PasswordUtilsService
  ) {
    this.host = new Host('', '', '', '', '', new Date(), '', 1, '', 1, 1, true);
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

  // Este método se dispara al cambiar de departamento
  onDepartmentChange() {
    const selectedId = this.host.departmentsId; // aquí tienes el ID seleccionado
    console.log('Departamento seleccionado:', selectedId);

    // Llamas a getCities con ese ID
    this.getCities(Number(selectedId));
  }

  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => {
        this.ciudades = response;
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      },
    });
  }

  onSubmit(form: NgForm): void {
    // Validación de contraseña segura antes de llamar al backend
    if (!this.passwordUtils.isStrong(this.host.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal');
      return;
    }
    this.host.rolesId = 2;
    this.host.active = true;
    this.host.departmentsId = Number(this.host.departmentsId);
    console.log(this.host);
    this._hostService.register(this.host).subscribe({
      next: (response) => {
        console.log('Anfitrión registrado:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al registrar anfitrión:', error);

        // 🔍 Primero, intentamos obtener el mensaje del error
        const backendMessage =
          typeof error.error === 'string'
            ? error.error
            : error.error?.message || '';

        // 🧩 Detectar correo duplicado (MySQL UNIQUE)
        if (
          backendMessage.includes('Duplicate entry') ||
          error.status === 409
        ) {
          this.errorMessage =
            'El correo ingresado ya está registrado. Intenta con otro.';
        } else if (error.status === 400) {
          this.errorMessage =
            'Verifica los datos ingresados. Puede que falte algún campo obligatorio.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        this.showModal('errorModal');
      },
    });
  }

  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }
    this.router.navigate(['/']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
