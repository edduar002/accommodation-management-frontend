// Importaciones necesarias para el componente Angular
import { Component } from '@angular/core'; // Decorador para definir un componente
import { Router } from '@angular/router'; // Para redirecciones entre rutas
import { CommonModule } from '@angular/common'; // Proporciona directivas comunes como ngIf y ngFor
import { FormsModule, NgForm } from '@angular/forms'; // Para trabajar con formularios template-driven
import { Administrator } from '../../models/administrator'; // Modelo de datos de administrador
import { AdministratorService } from '../../services/administrator.service'; // Servicio para registro de administradores
import { PasswordUtilsService } from '../../core/utils/password-utils.service'; // Servicio para validar contraseñas

@Component({
  selector: 'app-register-administrator', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, FormsModule], // Módulos requeridos en la plantilla
  templateUrl: './register-administrator.component.html', // Archivo HTML del componente
  styleUrl: './register-administrator.component.css', // Archivo CSS del componente
  providers: [AdministratorService], // Servicio inyectado localmente
})
export class RegisterAdministratorComponent {
  // Objeto que contiene los datos del administrador a registrar
  public administrator: Administrator;

  // Mensaje de error para mostrar en el modal de error
  public errorMessage: string = '';

  /**
   * Constructor del componente
   * @param _administratorService Servicio para interactuar con el backend de administradores
   * @param router Servicio para navegación entre rutas
   * @param passwordUtils Servicio para validar la seguridad de contraseñas
   */
  constructor(
    private _administratorService: AdministratorService,
    private router: Router,
    private passwordUtils: PasswordUtilsService
  ) {
    // Inicializar administrador con valores vacíos y rol 1 (Administrador)
    this.administrator = new Administrator('', '', '', '', 1);
  }

  /**
   * Método que se ejecuta al enviar el formulario de registro.
   * Realiza validaciones previas, registra al administrador y,
   * tras un registro exitoso, ejecuta login automático.
   * @param form Referencia al formulario Angular.
   */
  onSubmit(form: NgForm): void {
    // Validar que la contraseña sea segura antes de enviar al backend
    if (!this.passwordUtils.isStrong(this.administrator.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal'); // Mostrar modal de error
      return; // Detener ejecución
    }

    // Asignar rol fijo de Administrador
    this.administrator.rolesId = 1;

    // ✅ Llamar al servicio para registrar al administrador
    this._administratorService.register(this.administrator).subscribe({
      next: (response) => {
        // Registro exitoso, proceder con login automático
        this._administratorService
          .login({
            email: this.administrator.email, // Email ingresado en el registro
            password: this.administrator.password, // Contraseña del formulario
          })
          .subscribe({
            next: (loginResponse) => {
              // Guardar sesión del administrador en el almacenamiento correspondiente
              this._administratorService.saveSession(loginResponse);

              // Mostrar modal de éxito tras registro + login
              this.showModal('successModal');

              // Limpiar formulario
              form.resetForm();
            },
            error: (loginError) => {
              // El registro fue exitoso, pero falló el login automático
              console.error('Error al hacer login automático:', loginError);

              this.errorMessage =
                'El registro fue exitoso, pero ocurrió un error al iniciar sesión.';

              // Mostrar modal de error
              this.showModal('errorModal');
            },
          });
      },
      error: (error) => {
        // Error durante el registro
        console.error('Error al registrar administrador:', error);

        // Detectar error por correo duplicado
        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409 // Código HTTP Conflict
        ) {
          this.errorMessage =
            'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        // Mostrar modal de error
        this.showModal('errorModal');
      },
    });
  }

  /**
   * Método para cerrar el modal de éxito y redirigir a la página principal
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      // Obtener instancia del modal y ocultarlo
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();

      // Eliminar clases y backdrop generados por Bootstrap
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Redirigir a la página principal
    this.router.navigate(['/']);
  }

  /**
   * Método privado para mostrar un modal por su ID
   * @param id ID del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show(); // Mostrar modal
    }
  }
}
