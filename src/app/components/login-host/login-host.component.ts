import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';

/**
 * Componente LoginHostComponent
 * Permite que un anfitrión inicie sesión en la plataforma.
 * Gestiona el formulario, envía credenciales al servicio, valida si el usuario está activo y muestra modales de éxito o error.
 */
@Component({
  selector: 'app-login-host',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Módulos necesarios para template y formularios
  templateUrl: './login-host.component.html',
  styleUrl: './login-host.component.css', // Nota: Angular recomienda styleUrls
  providers: [HostService], // Inyección del servicio de anfitrión
})
export class LoginHostComponent {
  // Objeto host enlazado con el formulario
  public host: Host;

  /**
   * Constructor del componente
   * @param _hostService Servicio para manejar login y sesión del anfitrión
   * @param router Para redirigir después del login exitoso
   */
  constructor(private _hostService: HostService, private router: Router) {
    // Inicializa el host con valores por defecto
    this.host = new Host(
      '',
      '',
      '',
      '',
      '',
      new Date(),
      '',
      1,
      '',
      1,
      1,
      '',
      '',
      true
    );
  }

  /**
   * Método llamado al enviar el formulario
   * @param form Objeto NgForm del formulario de login
   */
  onSubmit(form: NgForm): void {
    // Llamada al servicio para hacer login con los datos del anfitrión
    this._hostService.login(this.host).subscribe({
      next: (response) => {

        // Validar si el anfitrión está activo
        if (Number(response.active) === 1) {
          // Guardar token y datos del usuario en sesión
          this._hostService.saveSession(response);

          // Mostrar modal de éxito
          this.showModal('successModal');

          // Limpiar formulario después del envío exitoso
          form.resetForm();
        } else {
          // Usuario inactivo → Mostrar modal de error
          this.showModal('errorModal');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        // Error de servidor o credenciales inválidas → Mostrar modal de error
        this.showModal('errorModal');
      },
    });
  }

  /**
   * Cierra el modal de éxito y redirige al dashboard del anfitrión
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

    // Redirige al dashboard del anfitrión después de cerrar el modal
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