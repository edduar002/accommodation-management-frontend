import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css',
  providers: [ServiceService]
})
export class CreateServiceComponent {
  public service: Service;

  constructor(
    private _serviceService: ServiceService,
    private router: Router
  ) {
    this.service = new Service('', true);
  }

  onSubmit(form: NgForm): void {
    this.service.active = true;
    this._serviceService.register(this.service).subscribe({
      next: (response) => {
        console.log('Servicio creado:', response);

        //Mostrar el modal de éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl && (window as any).bootstrap?.Modal) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm();
      },
      error: (error) => {
        console.error('Error al crear servicio:', error);
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
    this.router.navigate(['/managementService']);
  }
}