// Importaciones necesarias para el componente Angular
import { Component } from '@angular/core'; // Decorador para definir un componente
import { Router } from '@angular/router'; // Para navegación entre rutas
import { CommonModule } from '@angular/common'; // Directivas comunes como ngIf, ngFor
import { FormsModule, NgForm } from '@angular/forms'; // Formularios template-driven
import { Department } from '../../models/department'; // Modelo de Departamento
import { DepartmentService } from '../../services/department.service'; // Servicio para obtener departamentos
import { City } from '../../models/city'; // Modelo de Ciudad
import { CityService } from '../../services/city.service'; // Servicio para obtener ciudades
import { Host } from '../../models/host'; // Modelo de Host
import { HostService } from '../../services/host.service'; // Servicio para registrar hosts
import { PasswordUtilsService } from '../../core/utils/password-utils.service'; // Validación de contraseñas

@Component({
  selector: 'app-register-host', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, FormsModule], // Módulos requeridos
  templateUrl: './register-host.component.html', // Plantilla HTML
  styleUrl: './register-host.component.css', // CSS del componente
  providers: [HostService, DepartmentService, CityService], // Servicios inyectados
})
export class RegisterHostComponent {
  // Objeto que almacena los datos del anfitrión
  public host: Host;

  // Listado de departamentos y ciudades para dropdowns dinámicos
  departamentos: Department[] = [];
  ciudades: City[] = [];

  // Mensaje de error a mostrar en modales
  public errorMessage: string = '';

  // Variables para control de imagen seleccionada
  selectedFile?: File;
  uploading = false;

  /**
   * Constructor del componente
   * @param _hostService Servicio para registrar hosts
   * @param _departmentService Servicio para obtener departamentos
   * @param _cityService Servicio para obtener ciudades
   * @param router Servicio de navegación
   * @param passwordUtils Servicio para validar contraseñas
   */
  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private router: Router,
    private passwordUtils: PasswordUtilsService
  ) {
    // Inicializar host con valores vacíos y rol 3 (anfitrión)
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
   * Método que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.getAllDepartments(); // Obtener departamentos al cargar
    this.onDepartmentChange(); // Inicializar ciudades
  }

  /**
   * Método para capturar archivo de imagen seleccionado por el usuario
   * @param event Evento de input file
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Obtener todos los departamentos desde el backend
   */
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

  /**
   * Método que se dispara al cambiar de departamento
   * Actualiza la lista de ciudades según el departamento seleccionado
   */
  onDepartmentChange() {
    const selectedId = this.host.departmentsId; // ID del departamento seleccionado
    this.getCities(Number(selectedId)); // Obtener ciudades del departamento
  }

  /**
   * Obtener ciudades de un departamento específico
   * @param departmentId ID del departamento
   */
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

  /**
   * Método que se ejecuta al enviar el formulario de registro
   * @param form Referencia al formulario Angular
   */
  onSubmit(form: NgForm): void {
    // Validar seguridad de contraseña
    if (!this.passwordUtils.isStrong(this.host.password)) {
      this.errorMessage =
        'La contraseña es insegura. Debe tener mínimo 6 caracteres, incluir mayúsculas, minúsculas, números y un símbolo.';
      this.showModal('errorModal'); // Mostrar modal de error
      return;
    }

    this.host.rolesId = 3; // Rol fijo: Anfitrión
    this.host.active = true; // Activar host

    // Si el usuario seleccionó una imagen, subirla antes de registrar
    if (this.selectedFile) {
      this.uploading = true;
      this._hostService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.host.imgUrl = res.secure_url; // URL de la imagen subida
          this.uploading = false;
          this.registerUser(form); // Registrar usuario después de subir imagen
        },
        error: (err) => {
          console.error('Error al subir imagen:', err);
          this.uploading = false;
          this.errorMessage = 'Error al subir la imagen.';
          this.showModal('errorModal'); // Mostrar modal de error
        },
      });
    } else {
      this.registerUser(form); // Registrar sin imagen
    }
  }

  /**
   * Método privado para registrar al host en el backend.
   * Tras un registro exitoso, se realiza login automático.
   * @param form Referencia al formulario Angular.
   */
  private registerUser(form: NgForm): void {
    this._hostService.register(this.host).subscribe({
      next: (response) => {
        // ✅ Registro exitoso, proceder con login automático
        this._hostService
          .login({
            email: this.host.email, // Se usa el email del host recién registrado
            password: this.host.password, // Se usa la contraseña ingresada en el formulario
          })
          .subscribe({
            next: (loginResponse) => {
              // Guardar la sesión del usuario en el almacenamiento local o servicio
              this._hostService.saveSession(loginResponse);

              // Mostrar modal de éxito tras login automático
              this.showModal('successModal');

              // Limpiar formulario e imagen seleccionada
              form.resetForm();
              this.selectedFile = undefined;
            },
            error: (loginError) => {
              // El registro fue exitoso, pero falló el login automático
              console.error('Error al hacer login automático:', loginError);

              // Mostrar mensaje de error específico
              this.errorMessage =
                'El registro fue exitoso, pero ocurrió un error al iniciar sesión.';

              // Mostrar modal de error
              this.showModal('errorModal');
            },
          });
      },
      error: (error) => {
        // Error al registrar el usuario
        console.error('Error al registrar usuario:', error);

        // Detectar si el correo ya existe en la base de datos
        if (
          error?.error?.message?.includes('Duplicate entry') ||
          error?.error?.includes('Duplicate entry') ||
          error?.status === 409
        ) {
          this.errorMessage =
            'El correo ingresado ya está registrado. Intenta con otro.';
        } else {
          // Error genérico
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo nuevamente.';
        }

        // Mostrar modal de error
        this.showModal('errorModal');
      },
    });
  }

  /**
   * Cerrar modal de éxito y redirigir a la página principal
   */
  closeModal(): void {
    const modalEl = document.getElementById('successModal');
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();
      document.body.classList.remove('modal-open'); // Eliminar clase de modal abierto
      document.querySelector('.modal-backdrop')?.remove(); // Eliminar backdrop
    }
    this.router.navigate(['/']); // Redirigir
  }

  /**
   * Método privado para mostrar un modal por su ID
   * @param id ID del modal a mostrar
   */
  private showModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl && (window as any).bootstrap?.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
