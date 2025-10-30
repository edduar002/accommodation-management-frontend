import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css',
  providers: [RoleService]
})
export class CreateRoleComponent {
  public role: Role;

  constructor(
    private _roleService: RoleService,
    private router: Router
  ) {
    this.role = new Role('', true);
  }

  onSubmit(form: NgForm): void {
    this.role.active = true;
    this._roleService.register(this.role).subscribe({
      next: (response) => {
        console.log('Rol creado:', response);

        //Mostrar el modal al éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl && (window as any).bootstrap?.Modal) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm();
      },
      error: (error) => {
        console.error('Error al crear rol:', error);
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

    //Redirigir tras cerrar el modal
    this.router.navigate(['/managementRole']);
  }
}