import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';
import { PasswordUtilsService } from '../../core/utils/password-utils.service';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css',
  providers: [HostService, DepartmentService, CityService],
})
export class RegisterHostComponent {
  public host: Host;
  departamentos: Department[] = [];
  ciudades: City[] = [];
  public errorMessage: string = '';
  idPosicion: string = '';
  selectedFile?: File;
  uploading = false;

  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private router: Router,
    private passwordUtils: PasswordUtilsService
  ) {
    this.host = new Host(
      '',
      '',
      '',
      '',
      '',
      new Date(),
      '',
      1,
      '',
      1,
      1,
      '',
      '',
      true
    );
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.onDepartmentChange();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departamentos = response;
      },
      error: (error) => {
        console.error('Error al obtener departamentos:', error);
      },
    });
  }

  // Este método se dispara al cambiar de departamento
  onDepartmentChange() {
    const selectedId = this.host.departmentsId; // aquí tienes el ID seleccionado
    console.log('Departamento seleccionado:', selectedId);

    // Llamas a getCities con ese ID
    this.getCities(Number(selectedId));
  }

  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => {
        this.ciudades = response;
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (!this.passwordUtils.isStrong(this.host.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal');
      return;
    }

    this.host.rolesId = 3;
    this.host.active = true;

    // Si el usuario seleccionó una imagen
    if (this.selectedFile) {
      this.uploading = true;
      this._hostService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          console.log('Respuesta Cloudinary:', res); // 🔍 revisa en consola
          this.host.imgUrl = res.secure_url; // ✅ URL segura de Cloudinary
          this.uploading = false;
          this.registerUser(form);
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          this.uploading = false;
          this.errorMessage = 'Error al subir la imagen.';
          this.showModal('errorModal');
        },
      });
    } else {
      this.registerUser(form);
    }
  }

  private registerUser(form: NgForm): void {
    this._hostService.register(this.host).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.showModal('successModal');
        form.resetForm();
        this.selectedFile = undefined;
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409
        ) {
          this.errorMessage =
            'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }
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
    this.router.navigate(['/']);
  }

  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
