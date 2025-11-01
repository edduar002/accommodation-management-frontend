import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HostService } from '../../services/host.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { Host } from '../../models/host';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-host.component.html',
  styleUrls: ['./edit-profile-host.component.css'],
  providers: [HostService, DepartmentService, CityService]
})
export class EditProfileHostComponent implements OnInit, AfterViewInit {

  public host: Host;
  departamentos: Department[] = [];
  public errorMessage: string = '';
  ciudades: City[] = [];
  private successModal: any;
  private errorModal: any;
  selectedFile?: File;
  uploading = false;


  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _cityService: CityService,
    private _router: Router
  ) {
    // Inicializa el host vacío
    this.host = new Host('', '', '', '', '', new Date(), '', 1, '', 1, 1, '', '', true);
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.getOne();
    this.onDepartmentChange()
  }

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];

  if (this.selectedFile) {
    // Vista previa inmediata en la imagen de perfil
    const reader = new FileReader();
    reader.onload = (e: any) => (this.host.imgUrl = e.target.result);
    reader.readAsDataURL(this.selectedFile);
  }
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


  ngAfterViewInit(): void {
    // Inicializa los modales Bootstrap cuando el DOM ya está cargado
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  /** Cargar departamentos */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      response => this.departamentos = response,
      error => console.error('Error al cargar departamentos', error)
    );
  }

  /** Cargar datos del host */
getOne(): void {
  this._route.params.subscribe(params => {
    const id = +params['id'];
    this._hostService.getOne(id).subscribe(
      response => {
        this.host = response;

        // ✅ Cargar ciudades basadas en el departamento del host
        if (this.host.departmentsId) {
          this.getCities(this.host.departmentsId);
        }
      },
      error => {
        console.error('Error al cargar host:', error);
        this._router.navigate(['/']);
      }
    );
  });
}


  /** Guardar cambios */
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      this.errorModal.show();
      return;
    }

    this._hostService.update(this.host.id!, this.host).subscribe(
      response => {
        this.successModal.show();
      },
      error => {
        this.errorMessage = 'Error al actualizar el perfil del anfitrión. Intenta nuevamente.';
        this.errorModal.show();
      }
    );
  }

  /** Cerrar modal y redirigir */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/']);
  }
}