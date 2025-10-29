import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Administrator } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service';
import { PasswordUtilsService } from '../../core/utils/password-utils.service';

@Component({
  selector: 'app-register-administrator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-administrator.component.html',
  styleUrl: './register-administrator.component.css',
  providers: [AdministratorService]
})
export class RegisterAdministratorComponent {
  public administrator: Administrator;
  public errorMessage: string = '';

  constructor(
    private _administratorService: AdministratorService,
    private router: Router,
    private passwordUtils: PasswordUtilsService,
  ) {
    this.administrator = new Administrator('', '', '', '', 1);
  }

  onSubmit(form: NgForm): void {
        // Validación de contraseña segura antes de llamar al backend
    if (!this.passwordUtils.isStrong(this.administrator.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal');
      return;
    }
    this.administrator.rolesId = 1; // Rol fijo: Administrador
    console.log('Administrador a enviar:', this.administrator);

    this._administratorService.register(this.administrator).subscribe({
      next: (response) => {
        console.log('Administrador registrado:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al registrar administrador:', error);

        // 🧩 Detectar error por correo duplicado
        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409 // Si el backend devuelve Conflict (409)
        ) {
          this.errorMessage = 'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        this.showModal('errorModal');
      }
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

    // ✅ Redirigir después de cerrar el modal
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