import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Administrator } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service';

/**
 * Componente LoginAdministratorComponent
 * Permite que un administrador inicie sesión en la plataforma.
 * Gestiona el formulario, envía credenciales al servicio, muestra modales de éxito o error.
 */
@Component({
  selector: 'app-login-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Módulos necesarios para el template y formularios
  templateUrl: './login-administrator.component.html',
  styleUrl: './login-administrator.component.css', // Nota: Angular recomienda styleUrls
  providers: [AdministratorService], // Inyección del servicio de administrador
})
export class LoginAdministratorComponent {
  // Objeto administrador enlazado con el formulario
  public administrator: Administrator;

  /**
   * Constructor del componente
   * @param _administratorService Servicio para manejar login y sesión del administrador
   * @param router Para redirigir después del login exitoso
   */
  constructor(
    private _administratorService: AdministratorService,
    private router: Router
  ) {
    // Inicializa el administrador con valores por defecto
    this.administrator = new Administrator('', '', '', '', 1);
  }

  /**
   * Método llamado al enviar el formulario
   * @param form Objeto NgForm del formulario de login
   */
  onSubmit(form: NgForm): void {
    // Llamada al servicio para hacer login con los datos del administrador
    this._administratorService.login(this.administrator).subscribe({
      next: (response) => {

        // Guardar token y datos del usuario en sesión
        this._administratorService.saveSession(response);

        // Mostrar modal de éxito
        this.showModal('successModal');

        // Limpiar formulario después del envío exitoso
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        // Mostrar modal de error si falla la autenticación
        this.showModal('errorModal');
      },
    });
  }

  /**
   * Cierra el modal de éxito y redirige al usuario
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');

    // Verificar si existe el modal y la librería bootstrap está cargada
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide(); // Cierra el modal
      document.body.classList.remove('modal-open'); // Remueve clase de scroll deshabilitado
      document.querySelector('.modal-backdrop')?.remove(); // Elimina backdrop
    }

    // Redirige al inicio después de cerrar el modal
    this.router.navigate(['/']);
  }

  /**
   * Muestra un modal dado su id
   * @param id Id del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);

    // Verifica que el modal exista y la librería bootstrap esté disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show(); // Muestra el modal
    }
  }
}