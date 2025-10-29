import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Accommodation } from '../../models/accommodation';
import { Department } from '../../models/department';
import { AccommodationService } from '../../services/accommodation.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
  providers: [AccommodationService, DepartmentService],
})
export class CreateAccommodationComponent implements OnInit {
  public accommodation: Accommodation;
  departamentos: Department[] = [];

  constructor(
    private _accommodationService: AccommodationService,
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    this.accommodation = new Accommodation('', '', '', 0, 0, 1, true, 0, 1, '',true);
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departamentos = response;
      },
      error: (error) => console.error('Error al obtener departamentos:', error),
    });
  }

  onSubmit(form: NgForm): void {
    this.accommodation.hostsId = 1;
    this.accommodation.available = true;
    this.accommodation.active = true;
    this.accommodation.qualificationsId = null as any;

    this._accommodationService.register(this.accommodation).subscribe({
      next: (response) => {
        console.log('Alojamiento creado:', response);

        // ✅ Mostrar el modal de éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm();
      },
      error: (error) => {
        console.error('Error al crear alojamiento:', error);
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
    this.router.navigate(['/managementAccommodations']);
  }
}