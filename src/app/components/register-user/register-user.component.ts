import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PasswordUtilsService } from '../../core/utils/password-utils.service';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  providers: [UserService, DepartmentService, CityService],
})
export class RegisterUserComponent {
  public user: User;
  public errorMessage: string = '';
  departamentos: Department[] = [];
  ciudades: City[] = [];

  constructor(
    private _userService: UserService,
    private _cityService: CityService,
    private _departmentService: DepartmentService,
    private passwordUtils: PasswordUtilsService,
    private router: Router,
  ) {
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      new Date(),
      '',
      1,
      1,
      1,
      new Date(),
      new Date(),
      true
    );
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

    // Este método se dispara al cambiar de departamento
  onDepartmentChange() {
    const selectedId = this.user.departmentId; // aquí tienes el ID seleccionado
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
    // Validación de contraseña segura antes de llamar al backend
    if (!this.passwordUtils.isStrong(this.user.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal');
      return;
    }

    this.user.rolesId = 3;
    this.user.active = true;

    this._userService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409
        ) {
          this.errorMessage =
            'El correo ingresado ya está registrado. Intenta con otro.';
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
