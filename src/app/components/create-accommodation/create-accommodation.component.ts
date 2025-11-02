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
import { LocationComponent } from '../location/location.component'; // 👈 Importa el que sube imágenes

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationComponent],
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
  providers: [
    AccommodationService,
    DepartmentService,
    CityService,
    UserService,
  ],
})
export class CreateAccommodationComponent implements OnInit {
  public accommodation: Accommodation;
  departamentos: Department[] = [];
  ciudades: City[] = [];
  selectedFile?: File;
  uploading = false;

  constructor(
    private _accommodationService: AccommodationService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private _userService: UserService, // 👈 para usar uploadImage()
    private router: Router
  ) {
    this.accommodation = new Accommodation(
      '',
      '',
      '',
      0,
      0,
      1,
      true,
      0,
      1,
      1,
      '',
      '',
      true,
      '',
      ''
    );
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.onDepartmentChange();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Vista previa inmediata
      const reader = new FileReader();
      reader.onload = (e: any) => (this.accommodation.imgUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onLocationChange(coord: { lat: number; lng: number }) {
    this.accommodation.exactLocation = `${coord.lat.toFixed(
      6
    )}, ${coord.lng.toFixed(6)}`;

    console.log('📍 Ubicación formateada:', this.accommodation.exactLocation);
  }

  onDepartmentChange() {
    const selectedId = this.accommodation.departmentsId;
    this.getCities(Number(selectedId));
  }

  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => (this.ciudades = response),
      error: (error) => console.error('Error al obtener ciudades:', error),
    });
  }

  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => (this.departamentos = response),
      error: (error) => console.error('Error al obtener departamentos:', error),
    });
  }

  onSubmit(form: NgForm): void {
    this.accommodation.hostsId = 1;
    this.accommodation.available = true;
    this.accommodation.active = true;
    this.accommodation.qualificationsId = null as any;

    // ✅ Subida de imagen a Cloudinary antes de registrar
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
      this.registerAccommodation(form);
    }
  }

  private registerAccommodation(form: NgForm): void {
    console.log(this.accommodation.exactLocation);
    this._accommodationService.register(this.accommodation).subscribe({
      next: (response) => {
        console.log('Alojamiento creado:', response);
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }
        form.resetForm();
        this.selectedFile = undefined;
      },
      error: (error) => console.error('Error al crear alojamiento:', error),
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
    this.router.navigate(['/managementAccommodations']);
  }
}
