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

// Declaración de variable global Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-host.component.html',
  styleUrls: ['./edit-profile-host.component.css'],
  providers: [HostService, DepartmentService, CityService],
})
export class EditProfileHostComponent implements OnInit, AfterViewInit {

  // Host a editar
  public host: Host;

  // Lista de departamentos disponibles
  departamentos: Department[] = [];

  // Lista de ciudades según el departamento seleccionado
  ciudades: City[] = [];

  // Mensaje de error mostrado en modal
  public errorMessage: string = '';

  // Referencias a modales de Bootstrap
  private successModal: any;
  private errorModal: any;

  // Archivo de imagen seleccionado
  selectedFile?: File;

  // Estado de subida de archivo
  uploading = false;

  /**
   * Constructor del componente
   * @param _hostService Servicio para obtener y actualizar host
   * @param _departmentService Servicio para obtener departamentos
   * @param _route Para obtener parámetros de la ruta
   * @param _cityService Servicio para obtener ciudades
   * @param _router Para navegar entre rutas
   */
  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _cityService: CityService,
    private _router: Router
  ) {
    // Inicializa host con valores predeterminados
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

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Carga departamentos, datos del host y ciudades correspondientes
   */
  ngOnInit(): void {
    // Carga departamentos disponibles
    this.loadDepartments();

    // Carga información del host
    this.getOne();

    // Actualiza las ciudades según el departamento del host
    this.onDepartmentChange();
  }

  /**
   * Captura y vista previa de imagen seleccionada
   * @param event Evento del input file
   */
  onFileSelected(event: any) {
    // Obtener el archivo seleccionado
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Crear vista previa inmediata en la imagen de perfil
      const reader = new FileReader();
      reader.onload = (e: any) => (this.host.imgUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * Se dispara al cambiar de departamento
   * Actualiza la lista de ciudades según el departamento seleccionado
   */
  onDepartmentChange() {
    const selectedId = this.host.departmentsId; // ID del departamento seleccionado

    // Actualiza las ciudades relacionadas
    this.getCities(Number(selectedId));
  }

  /**
   * Obtiene las ciudades para un departamento específico
   * @param departmentId ID del departamento
   */
  getCities(departmentId: number): void {
    this._cityService.getAllForDepartment(departmentId).subscribe({
      next: (response: any) => {
        // Asigna las ciudades obtenidas a la lista
        this.ciudades = response;
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      },
    });
  }

  /**
   * Método de Angular que se ejecuta después de inicializar la vista
   * Se utiliza para inicializar los modales Bootstrap
   */
  ngAfterViewInit(): void {
    // Inicializa modal de éxito
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );

    // Inicializa modal de error
    this.errorModal = new bootstrap.Modal(
      document.getElementById('errorModal')
    );
  }

  /**
   * Carga todos los departamentos disponibles
   */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      (response) => (this.departamentos = response),
      (error) => console.error('Error al cargar departamentos', error)
    );
  }

  /**
   * Obtener información de un host específico
   */
  getOne(): void {
    // Suscribirse a parámetros de la ruta
    this._route.params.subscribe((params) => {
      const id = +params['id'];

      // Obtener host por ID
      this._hostService.getOne(id).subscribe(
        (response) => {
          this.host = response;

          // Cargar ciudades basadas en el departamento del host
          if (this.host.departmentsId) {
            this.getCities(this.host.departmentsId);
          }
        },
        (error) => {
          console.error('Error al cargar host:', error);
          // Redirigir al inicio en caso de error
          this._router.navigate(['/']);
        }
      );
    });
  }

  /**
   * Guardar cambios realizados en el host
   * @param form Formulario a enviar
   */
  onSubmit(form: NgForm): void {
    // Validar formulario
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      this.errorModal.show();
      return;
    }

    // Actualizar host mediante el servicio
    this._hostService.update(this.host.id!, this.host).subscribe(
      (response) => {
        // Mostrar modal de éxito
        this.successModal.show();
      },
      (error) => {
        this.errorMessage =
          'Error al actualizar el perfil del anfitrión. Intenta nuevamente.';
        this.errorModal.show();
      }
    );
  }

  /**
   * Cerrar modal de éxito y redirigir a la página principal
   */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/']);
  }
}