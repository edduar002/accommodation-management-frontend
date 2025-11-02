import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '../../services/city.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { City } from '../../models/city';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css'],
  providers: [CityService, DepartmentService],
})
export class EditCityComponent implements OnInit, AfterViewInit {
  public city: City; // Objeto que contiene la información de la ciudad a editar
  public errorMessage: string = ''; // Mensaje de error para mostrar en modal
  private successModal: any; // Referencia al modal de éxito
  private errorModal: any; // Referencia al modal de error
  departamentos: Department[] = []; // Lista de departamentos para el select dinámico

  constructor(
    private _cityService: CityService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _departmentService: DepartmentService
  ) {
    // Inicializa la ciudad con valores por defecto
    this.city = new City('', 1, '', true);
  }

  /** Método inicial de Angular que se ejecuta al cargar el componente */
  ngOnInit(): void {
    this.loadDepartments(); // Cargar todos los departamentos para el select
    this.getOne(); // Obtener la ciudad a editar por ID
  }

  /** Método que se ejecuta después de renderizar la vista, usado para inicializar modales */
  ngAfterViewInit(): void {
    // Inicializar modal de éxito
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
    // Inicializar modal de error
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /** Cargar departamentos desde el servicio */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      (response) => (this.departamentos = response), // Guardar departamentos obtenidos
      (error) => console.error('Error al cargar departamentos', error) // Manejo de error
    );
  }

  /** Obtener la ciudad por ID de la URL */
  getOne(): void {
    this._route.params.subscribe((params) => {
      const id = +params['id']; // Obtener ID de la ruta
      this._cityService.getOne(id).subscribe(
        (response) => (this.city = response), // Guardar ciudad obtenida
        (error) => this._router.navigate(['/managementCity']) // Redirigir si falla
      );
    });
  }

  /** Enviar formulario para actualizar ciudad */
  onSubmit(form: NgForm): void {
    // Validar que el formulario sea válido
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.errorModal.show(); // Mostrar modal de error
      return;
    }

    // Llamar al servicio para actualizar ciudad
    this._cityService.update(this.city.id!, this.city).subscribe(
      (response) => this.successModal.show(), // Mostrar modal de éxito
      (error) => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show(); // Mostrar modal de error
      }
    );
  }

  /** Cerrar modal de éxito y redirigir a la gestión de ciudades */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementCity']);
  }
}