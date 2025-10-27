import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RecoveryPassword } from '../../models/recoveryPassword';
import { AdministratorService } from '../../services/administrator.service';

@Component({
  selector: 'app-change-password-adminsitrator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password-admin.component.html',
  styleUrl: './change-password-admin.component.css',
  providers: [AdministratorService],
})
export class ChangePasswordAdminComponent {
  public recoveryPassword: RecoveryPassword;
  public errorMessage: string = '';

  constructor(
    private _administratorService: AdministratorService,
    private router: Router
  ) {
    this.recoveryPassword = new RecoveryPassword('', '');
  }

  onSubmit(form: NgForm): void {
    const adminsitrator = JSON.parse(localStorage.getItem('adminsitrator') || '{}');
    this.recoveryPassword.id = adminsitrator.id || 2;

    this._administratorService.changePassword(this.recoveryPassword.id!, this.recoveryPassword).subscribe({
      next: (response) => {
        console.log('Contraseña cambiada correctamente:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al cambiar la contraseña:', error);

        // Si la contraseña actual es incorrecta
        if (error?.error?.error === 'La contraseña actual es incorrecta') {
          this.errorMessage = 'La contraseña actual es incorrecta.';
        } else {
          this.errorMessage = 'Ocurrió un error al cambiar la contraseña. Inténtalo nuevamente.';
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