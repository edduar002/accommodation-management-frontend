import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

/**
 * Componente LoginUserComponent
 * Permite que un usuario inicie sesión en la plataforma.
 * Gestiona el formulario, envía credenciales al servicio, valida si el usuario está activo
 * y muestra modales de éxito o error según corresponda.
 */
@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Importa módulos para formularios y rutas
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css', // Nota: Angular recomienda "styleUrls" en plural
  providers: [UserService], // Servicio inyectado para manejar login y sesión de usuario
})
export class LoginUserComponent {
  // Objeto usuario enlazado al formulario
  public user: User;

  /**
   * Constructor del componente
   * @param _userService Servicio para manejar login y sesión del usuario
   * @param router Para redirigir después del login exitoso
   */
  constructor(private _userService: UserService, private router: Router) {
    // Inicializa el usuario con valores por defecto
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
   * Método llamado al enviar el formulario de login
   * @param form Objeto NgForm del formulario de usuario
   */
  onSubmit(form: NgForm): void {
    // Llamada al servicio para iniciar sesión con los datos del usuario
    this._userService.login(this.user).subscribe({
      next: (response) => {

        // Validar si el usuario está activo
        if (Number(response.active) === 1) {
          // Guardar token y datos del usuario en sesión
          this._userService.saveSession(response);

          // Usuario activo → mostrar modal de éxito
          this.showModal('successModal');

          // Limpiar formulario después del envío exitoso
          form.resetForm();
        } else {
          // Usuario inactivo → mostrar modal de error
          this.showModal('errorModal');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        // Credenciales incorrectas o error en servidor → mostrar modal de error
        this.showModal('errorModal');
      },
    });
  }

  /**
   * Cierra el modal de éxito y redirige al dashboard del usuario
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');

    // Verificar si el modal existe y bootstrap está cargado
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide(); // Cierra el modal
      document.body.classList.remove('modal-open'); // Remueve clase que bloquea scroll
      document.querySelector('.modal-backdrop')?.remove(); // Elimina overlay del modal
    }

    // Redirige al dashboard del usuario
    this.router.navigate(['/']);
  }

  /**
   * Muestra un modal dado su id
   * @param id Id del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);

    // Verifica que el modal exista y bootstrap esté disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show(); // Muestra el modal
    }
  }
}