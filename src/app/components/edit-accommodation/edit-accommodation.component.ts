import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { DepartmentService } from '../../services/department.service';
import { Accommodation } from '../../models/accommodation';
import { Department } from '../../models/department';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  providers: [AccommodationService, DepartmentService]
})
export class EditAccommodationComponent implements OnInit, AfterViewInit {

  public accommodation: Accommodation;
  public departments: Department[] = [];
  public errorMessage: string = '';

  private successModal: any;
  private errorModal: any;

  constructor(
    private _accommodationService: AccommodationService,
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa un alojamiento con valores por defecto
    this.accommodation = new Accommodation(
      '', '', '', 0, 0, 1, true, null!, 1, 1, '', true
    );
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.getOne();
  }

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  /** 🔹 Cargar departamentos desde el servicio */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response) => this.departments = response,
      error: (err) => console.error('Error al cargar departamentos:', err)
    });
  }

  /** 🔹 Obtener alojamiento por ID (desde la URL) */
  getOne(): void {
    this._route.params.subscribe(params => {
      const id = + params['id'];
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          this.accommodation = response;
        },
        error: (error) => {
          console.error('Error al cargar alojamiento:', error);
          this._router.navigate(['/myAccommodations']);
        }
      });
    });
  }

  /** 🔹 Guardar cambios */
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos requeridos.';
      this.errorModal.show();
      return;
    }

    if (!this.accommodation.id) {
      this.errorMessage = 'No se encontró el ID del alojamiento.';
      this.errorModal.show();
      return;
    }

    this._accommodationService.update(this.accommodation.id, this.accommodation).subscribe({
      next: () => this.successModal.show(),
      error: () => {
        this.errorMessage = 'Error al actualizar el alojamiento. Intenta nuevamente.';
        this.errorModal.show();
      }
    });
  }

  /** 🔹 Cerrar modal y regresar */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/myAccommodations']);
  }
}