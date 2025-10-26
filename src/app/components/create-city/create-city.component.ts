import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { City } from '../../models/city';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-create-city',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css',
  providers: [CityService, DepartmentService],
})
export class CreateCityComponent {
  public city: City;
  departamentos: Department[] = [];

  constructor(
    private _cityService: CityService,
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    this.city = new City('', 1, true);
  }

  onSubmit(form: NgForm): void {
    this.city.active = true;
    this._cityService.register(this.city).subscribe({
      next: (response) => {
        console.log('Ciudad creada:', response);

        // ✅ Mostrar el modal al tener éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        form.resetForm(); // Limpia el formulario
      },
      error: (error) => {
        console.error('Error al crear ciudad:', error);
      },
    });
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
    this.router.navigate(['/managementCity']);
  }
}
