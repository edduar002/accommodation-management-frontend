import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers: [UserService],
})
export class LoginUserComponent {
  public user: User;

  constructor(private _userService: UserService, private router: Router) {
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
      new Date(),
      new Date(),
      true
    );
  }

  onSubmit(form: NgForm): void {
    this._userService.login(this.user).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

        // 👀 Verificar si el usuario está activo
        if (Number(response.active) === 1) {
          // ✅ Usuario activo → Mostrar modal de éxito
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

        // ❌ Credenciales incorrectas / error servidor
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

    // ✅ Redirigir al dashboard del usuario
    this.router.navigate(['/user/dashboard']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
