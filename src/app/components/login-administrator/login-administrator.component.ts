import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Administrator } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service';

@Component({
  selector: 'app-login-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-administrator.component.html',
  styleUrl: './login-administrator.component.css',
  providers: [AdministratorService],
})
export class LoginAdministratorComponent {
  public administrator: Administrator;

  constructor(
    private _administratorService: AdministratorService,
    private router: Router
  ) {
    this.administrator = new Administrator('', '', '', '', 1);
  }

  onSubmit(form: NgForm): void {
    this._administratorService.login(this.administrator).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // 👀 Validar si el usuario está activo
        if (response.active === 1) {
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

        // ❌ Error en servidor o credenciales inválidas → Modal de error
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

    //Redirigir después del inicio exitoso
    this.router.navigate(['/dashboard']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
