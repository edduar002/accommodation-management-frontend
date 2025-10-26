import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  providers: [UserService],
})
export class RegisterUserComponent {
  public user: User;
  public errorMessage: string = '';

  constructor(private _userService: UserService, private router: Router) {
    this.user = new User('', '', '', '', '', new Date(), '', 1, 1, new Date(), new Date(), true);
  }

  onSubmit(form: NgForm): void {
    this.user.departmentId = 1;
    this.user.rolesId = 3;

    this._userService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.showModal('successModal');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409
        ) {
          this.errorMessage = 'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        this.showModal('errorModal');
      },
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

    this.router.navigate(['/login']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}