import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Accommodation } from '../../models/accommodation';
import { Department } from '../../models/department';
import { AccommodationService } from '../../services/accommodation.service';
import { DepartmentService } from '../../services/department.service';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { UserService } from '../../services/user.service';
import { LocationComponent } from '../location/location.component';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationComponent],
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
  providers: [AccommodationService, DepartmentService, CityService, UserService],
})
export class CreateAccommodationComponent implements OnInit {
  // Modelo principal del alojamiento
  public accommodation: Accommodation;

  // Listas dinámicas de departamentos y ciudades
  departamentos: Department[] = [];
  ciudades: City[] = [];

  // Variables para manejo de imagen
  selectedFile?: File;
  uploading = false;

  constructor(
    private _accommodationService: AccommodationService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private _userService: UserService,
    private _hostService: HostService,
    private router: Router
  ) {
    // Inicializa un nuevo alojamiento con valores por defecto
    this.accommodation = new Accommodation(
      '', '', '', 0, 0, 1, true, 0, 1, 1, '', '', true, '', ''
    );
  }

  ngOnInit(): void {
    // Carga todos los departamentos al iniciar el componente
    this.getAllDepartments();

    // Inicializa la lista de ciudades según departamento seleccionado
    this.onDepartmentChange();
  }

  /** Maneja la selección de archivo de imagen */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Vista previa inmediata de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => (this.accommodation.imgUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /** Actualiza la ubicación exacta al recibir coordenadas desde LocationComponent */
  onLocationChange(coord: { lat: number; lng: number }) {
    this.accommodation.exactLocation = `${coord.lat.toFixed(6)}, ${coord.lng.toFixed(6)}`;
  }

  /** Se ejecuta cuando cambia el departamento para actualizar las ciudades disponibles */
  onDepartmentChange() {
    const selectedId = this.accommodation.departmentsId;
    this.getCities(Number(selectedId));
  }

  /** Obtiene las ciudades asociadas a un departamento */
  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => (this.ciudades = response),
      error: (error) => console.error('Error al obtener ciudades:', error),
    });
  }

  /** Obtiene todos los departamentos disponibles */
  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => (this.departamentos = response),
      error: (error) => console.error('Error al obtener departamentos:', error),
    });
  }

  /** Envía el formulario para crear un nuevo alojamiento */
  onSubmit(form: NgForm): void {
    // Obtiene el host actual y asigna su ID
    const host = this._hostService.getHost();
    if (host && host.id) {
      this.accommodation.hostsId = host.id;
    }

    // Valores por defecto
    this.accommodation.available = true;
    this.accommodation.active = true;
    this.accommodation.qualificationsId = null as any;

    // Si hay imagen seleccionada, se sube antes de registrar
    if (this.selectedFile) {
      this.uploading = true;
      this._userService.uploadImage(this.selectedFile).subscribe({
        next: (res: any) => {
          this.accommodation.imgUrl = res.url; // URL de Cloudinary
          this.uploading = false;
          this.registerAccommodation(form);
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          this.uploading = false;
        },
      });
    } else {
      // Sin imagen, registra directamente
      this.registerAccommodation(form);
    }
  }

  /** Función privada para registrar el alojamiento en el backend */
  private registerAccommodation(form: NgForm): void {

    this._accommodationService.register(this.accommodation).subscribe({
      next: (response) => {

        // Mostrar modal de éxito
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        // Limpia el formulario y la selección de imagen
        form.resetForm();
        this.selectedFile = undefined;
      },
      error: (error) => console.error('Error al crear alojamiento:', error),
    });
  }

  /** Cierra el modal de éxito y redirige al listado de alojamientos */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Redirige al usuario al listado de alojamientos
    this.router.navigate(['/managementAccommodations']);
  }
}