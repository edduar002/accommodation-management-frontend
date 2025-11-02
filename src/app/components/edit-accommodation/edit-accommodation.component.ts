import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { DepartmentService } from '../../services/department.service';
import { Accommodation } from '../../models/accommodation';
import { Department } from '../../models/department';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

declare var bootstrap: any; // Permite usar modales de Bootstrap

@Component({
  selector: 'app-edit-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css'],
  providers: [AccommodationService, DepartmentService, CityService],
})
export class EditAccommodationComponent implements OnInit, AfterViewInit {
  public accommodation: Accommodation; // Objeto con los datos del alojamiento
  public departments: Department[] = []; // Lista de departamentos
  public errorMessage: string = ''; // Mensaje de error global
  ciudades: City[] = []; // Lista de ciudades filtradas por departamento
  departamentos: Department[] = []; // Lista de departamentos para select
  private successModal: any; // Referencia al modal de éxito
  private errorModal: any; // Referencia al modal de error
  selectedFile?: File; // Archivo de imagen seleccionado
  uploading = false; // Estado de subida de archivo

  /**
   * Constructor del componente
   * @param _accommodationService Servicio para obtener/editar alojamientos
   * @param _departmentService Servicio para obtener departamentos
   * @param _cityService Servicio para obtener ciudades
   * @param _route Para acceder a parámetros de la ruta (ID alojamiento)
   * @param _router Para navegación programática
   */
  constructor(
    private _accommodationService: AccommodationService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa un alojamiento con valores por defecto
    this.accommodation = new Accommodation(
      '',
      '',
      '',
      0,
      0,
      1,
      true,
      null!,
      1,
      1,
      '',
      '',
      true,
      '',
      ''
    );
  }

  /**
   * Inicializa el componente
   * Carga departamentos y datos del alojamiento
   */
  ngOnInit(): void {
    this.loadDepartments(); // Cargar lista de departamentos
    this.getOne(); // Obtener alojamiento por ID
    this.onDepartmentChange(); // Inicializa ciudades según departamento seleccionado
  }

  /**
   * Se dispara al seleccionar un archivo de imagen
   * @param event Evento del input file
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Guardar archivo seleccionado

    if (this.selectedFile) {
      // Vista previa inmediata de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => (this.accommodation.imgUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * Método disparado al cambiar el departamento
   * Actualiza la lista de ciudades disponibles
   */
  onDepartmentChange() {
    const selectedId = this.accommodation.departmentsId;

    // Llama a getCities para filtrar ciudades por departamento
    this.getCities(Number(selectedId));
  }

  /**
   * Obtiene las ciudades de un departamento específico
   * @param departmentId ID del departamento seleccionado
   */
  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => {
        this.ciudades = response; // Guardar ciudades obtenidas
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      },
    });
  }

  /**
   * Inicializa los modales de Bootstrap al cargar la vista
   */
  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Cargar departamentos desde el servicio
   */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      (response) => (this.departamentos = response),
      (error) => console.error('Error al cargar departamentos', error)
    );
  }

  /**
   * Obtener alojamiento por ID desde la URL
   * También carga ciudades correspondientes al departamento del alojamiento
   */
  getOne(): void {
    this._route.params.subscribe((params) => {
      const id = +params['id'];
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          this.accommodation = response;
          if (this.accommodation.departmentsId) {
            this.getCities(this.accommodation.departmentsId);
          }
        },
        error: (error) => {
          console.error('Error al cargar alojamiento:', error);
          this._router.navigate(['/myAccommodations']); // Redirige si falla
        },
      });
    });
  }

  /**
   * Guardar los cambios realizados en el alojamiento
   * @param form Formulario de edición
   */
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

    this._accommodationService
      .update(this.accommodation.id, this.accommodation)
      .subscribe({
        next: () => this.successModal.show(), // Muestra modal de éxito
        error: () => {
          this.errorMessage =
            'Error al actualizar el alojamiento. Intenta nuevamente.';
          this.errorModal.show();
        },
      });
  }

  /**
   * Cierra el modal de éxito y redirige al listado de alojamientos
   */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/myAccommodations']);
  }
}