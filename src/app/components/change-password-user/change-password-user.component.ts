import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RecoveryPassword } from '../../models/recoveryPassword';
import { UserService } from '../../services/user.service';
import { PasswordUtilsService } from '../../core/utils/password-utils.service';

@Component({
  selector: 'app-change-password-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password-user.component.html',
  styleUrl: './change-password-user.component.css',
  providers: [UserService],
})
export class ChangePasswordUserComponent {
  // Objeto que almacena la contraseña actual y la nueva del usuario
  public recoveryPassword: RecoveryPassword;

  // Mensaje de error a mostrar en el modal de error
  public errorMessage: string = '';

  /**
   * Constructor del componente
   * @param _userService Servicio para manejar operaciones del usuario
   * @param router Servicio para redirección de rutas
   * @param passwordUtils Servicio para validar fuerza de la contraseña
   */
  constructor(
    private _userService: UserService,
    private router: Router,
    private passwordUtils: PasswordUtilsService
  ) {
    // Inicializa el objeto RecoveryPassword con cadenas vacías
    this.recoveryPassword = new RecoveryPassword('', '');
  }

  /**
   * Método que se ejecuta al enviar el formulario de cambio de contraseña
   * @param form Formulario Angular de tipo NgForm
   */
  onSubmit(form: NgForm): void {
    // Validar que la nueva contraseña sea segura antes de enviar al backend
    if (!this.passwordUtils.isStrong(this.recoveryPassword.newPassword)) {
      // Mensaje de error si la contraseña no cumple con los requisitos
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      // Mostrar modal de error
      this.showModal('errorModal');
      return; // Detener ejecución
    }

    // Obtener datos del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Asignar el id del usuario al objeto de recuperación de contraseña
    this.recoveryPassword.id = user.id || 2; // Valor por defecto en caso de no existir

    // Llamar al servicio para cambiar la contraseña
    this._userService
      .changePassword(this.recoveryPassword.id!, this.recoveryPassword)
      .subscribe({
        next: (response) => {
          // Mostrar modal de éxito
          this.showModal('successModal');
          // Resetear formulario después de éxito
          form.resetForm();
        },
        error: (error) => {
          // Mostrar error en consola
          console.error('Error al cambiar la contraseña:', error);

          // Validar si la contraseña actual es incorrecta
          if (error?.error?.error === 'La contraseña actual es incorrecta') {
            this.errorMessage = 'La contraseña actual es incorrecta.';
          } else {
            this.errorMessage =
              'Ocurrió un error al cambiar la contraseña. Inténtalo nuevamente.';
          }

          // Mostrar modal de error
          this.showModal('errorModal');
        },
      });
  }

  /**
   * Cierra el modal de éxito y navega a la ruta principal
   */
  closeModal(): void {
    // Obtener el elemento del modal por su ID
    const modalEl = document.getElementById('successModal');

    // Verificar que exista y que Bootstrap Modal esté disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      // Obtener instancia del modal
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      // Ocultar el modal
      modalInstance?.hide();
      // Remover clase que bloquea scroll
      document.body.classList.remove('modal-open');
      // Remover backdrop del modal
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Redirigir al usuario a la página principal
    this.router.navigate(['/']);
  }

  /**
   * Muestra un modal por su ID
   * @param id ID del modal a mostrar
   */
  private showModal(id: string): void {
    // Obtener el elemento del modal
    const modalEl = document.getElementById(id);

    // Verificar que exista y que Bootstrap Modal esté disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      // Crear nueva instancia del modal
      const modal = new (window as any).bootstrap.Modal(modalEl);
      // Mostrar el modal
      modal.show();
    }
  }
}