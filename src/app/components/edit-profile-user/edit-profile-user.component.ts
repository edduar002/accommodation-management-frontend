import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { User } from '../../models/user';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

// Declaración de variable global Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.css'],
  providers: [UserService, DepartmentService, CityService],
})
export class EditProfileUserComponent implements OnInit, AfterViewInit {

  // Usuario a editar
  public user: User;

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
   * @param _userService Servicio para obtener y actualizar usuario
   * @param _departmentService Servicio para obtener departamentos
   * @param _route Para obtener parámetros de la ruta
   * @param _cityService Servicio para obtener ciudades
   * @param _router Para navegar entre rutas
   */
  constructor(
    private _userService: UserService,
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _cityService: CityService,
    private _router: Router
  ) {
    // Inicializa usuario con valores predeterminados
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      new Date(),
      '',
      1,
      1,
      1,
      '',
      '',
      new Date(),
      new Date(),
      true
    );
  }

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Carga departamentos, datos del usuario y ciudades correspondientes
   */
  ngOnInit(): void {
    // Carga departamentos disponibles
    this.loadDepartments();

    // Carga información del usuario
    this.getOne();

    // Actualiza las ciudades según el departamento del usuario
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
      reader.onload = (e: any) => (this.user.imgUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * Se dispara al cambiar de departamento
   * Actualiza la lista de ciudades según el departamento seleccionado
   */
  onDepartmentChange() {
    const selectedId = this.user.departmentId; // ID del departamento seleccionado

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
   * Obtener información de un usuario específico
   */
  getOne(): void {
    // Suscribirse a parámetros de la ruta
    this._route.params.subscribe((params) => {
      const id = +params['id'];

      // Obtener usuario por ID
      this._userService.getOne(id).subscribe(
        (response) => {
          this.user = response;

          // Cargar ciudades basadas en el departamento del usuario
          if (this.user.departmentId) {
            this.getCities(this.user.departmentId);
          }
        },
        (error) => {
          console.error('Error al cargar usuario:', error);
          // Redirigir al inicio en caso de error
          this._router.navigate(['/']);
        }
      );
    });
  }

  /**
   * Guardar cambios realizados en el usuario
   * @param form Formulario a enviar
   */
  onSubmit(form: NgForm): void {
    // Validar formulario
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      this.errorModal.show();
      return;
    }

    // Actualizar usuario mediante el servicio
    this._userService.update(this.user.id!, this.user).subscribe(
      (response) => {
        // Mostrar modal de éxito
        this.successModal.show();
      },
      (error) => {
        this.errorMessage =
          'Error al actualizar el perfil. Intenta nuevamente.';
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