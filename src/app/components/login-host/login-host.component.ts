import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-login-host',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-host.component.html',
  styleUrl: './login-host.component.css',
  providers: [HostService],
})
export class LoginHostComponent {
  public host: Host;

  constructor(private _hostService: HostService, private router: Router) {
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

  onSubmit(form: NgForm): void {
    this._hostService.login(this.host).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // 👀 Validar si el host está activo
        if (Number(response.active) === 1) {
          // ✅ Guardar token + datos del usuario
          this._hostService.saveSession(response);
          //Usuario activo → Mostrar modal de éxito
          this.showModal('successModal');

          // Limpiar formulario
          form.resetForm();
        } else {
          // ❌ Usuario inactivo → Mostrar modal de error
          this.showModal('errorModal');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        // ❌ Error al iniciar sesión → Mostrar modal de error
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

    //Redirigir al dashboard del anfitrión
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
