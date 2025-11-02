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
  // Modelo del usuario a registrar
  public user: User;

  // Mensaje de error a mostrar en modales
  public errorMessage: string = '';

  // Listado de departamentos y ciudades dinámicos
  departamentos: Department[] = [];
  ciudades: City[] = [];

  // Archivo seleccionado por el usuario
  selectedFile?: File;
  uploading = false;

  constructor(
    private _userService: UserService,
    private _cityService: CityService,
    private _departmentService: DepartmentService,
    private passwordUtils: PasswordUtilsService,
    private router: Router
  ) {
    // Inicializamos el objeto usuario con valores por defecto
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
      '',
      '',
      new Date(),
      new Date(),
      true
    );
  }

  /**
   * Método de ciclo de vida Angular que se ejecuta al inicializar el componente.
   * Obtiene todos los departamentos y carga las ciudades correspondientes.
   */
  ngOnInit(): void {
    this.getAllDepartments();
    this.onDepartmentChange();
  }

  /**
   * Maneja la selección de un archivo de imagen.
   * @param event Evento de cambio del input file
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Método disparado al cambiar el departamento.
   * Obtiene las ciudades correspondientes al departamento seleccionado.
   */
  onDepartmentChange() {
    const selectedId = this.user.departmentId;

    this.getCities(Number(selectedId));
  }

  /**
   * Obtiene todas las ciudades de un departamento específico
   * @param departmentId Id del departamento seleccionado
   */
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

  /**
   * Obtiene todos los departamentos del sistema
   */
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

  /**
   * Método que se ejecuta al enviar el formulario de registro.
   * Valida contraseña, maneja imagen y registra al usuario.
   * @param form Formulario de Angular
   */
  onSubmit(form: NgForm): void {
    // Validación de contraseña segura
    if (!this.passwordUtils.isStrong(this.user.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal');
      return;
    }

    this.user.rolesId = 3;
    this.user.active = true;

    // Subida de imagen si el usuario seleccionó un archivo
    if (this.selectedFile) {
      this.uploading = true;
      this._userService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.user.imgUrl = res.secure_url;
          this.uploading = false;
          this.registerUser(form);
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          this.uploading = false;
          this.errorMessage = 'Error al subir la imagen.';
          this.showModal('errorModal');
        },
      });
    } else {
      this.registerUser(form);
    }
  }

  /**
   * Registro real del usuario en el backend.
   * También realiza login automático tras el registro exitoso.
   * @param form Formulario de Angular
   */
  private registerUser(form: NgForm): void {
    this._userService.register(this.user).subscribe({
      next: (response) => {

        // Login automático del usuario recién registrado
        this._userService
          .login({
            email: this.user.email,
            password: this.user.password,
          })
          .subscribe({
            next: (loginResponse) => {
              this._userService.saveSession(loginResponse);

              // Mostrar modal de éxito y resetear formulario
              this.showModal('successModal');
              form.resetForm();
              this.selectedFile = undefined;
            },
            error: (loginError) => {
              console.error('Error al hacer login automático:', loginError);
              this.errorMessage =
                'El registro fue exitoso, pero ocurrió un error al iniciar sesión.';
              this.showModal('errorModal');
            },
          });
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        // Manejo de correo duplicado
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

  /**
   * Cierra el modal de éxito y redirige al inicio
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    this.router.navigate(['/']);
  }

  /**
   * Muestra un modal de Bootstrap por id
   * @param id Id del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}