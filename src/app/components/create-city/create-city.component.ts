import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { City } from '../../models/city';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-create-city',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css',
  providers: [CityService, DepartmentService], // Servicios inyectados para manejar ciudades y departamentos
})
export class CreateCityComponent {
  public city: City; // Objeto que representa la ciudad que se va a crear
  departamentos: Department[] = []; // Lista de departamentos disponibles

  /**
   * Constructor del componente
   * @param _cityService Servicio para operaciones de ciudades
   * @param _departmentService Servicio para operaciones de departamentos
   * @param router Para navegación entre rutas
   */
  constructor(
    private _cityService: CityService,
    private _departmentService: DepartmentService,
    private router: Router
  ) {
    // Inicializa el objeto city con valores por defecto
    this.city = new City('', 1, '', true);
  }

  /**
   * Método que se ejecuta al enviar el formulario
   * @param form Formulario Angular
   */
  onSubmit(form: NgForm): void {
    // Asegura que la ciudad esté activa
    this.city.active = true;

    // Llama al servicio para registrar la ciudad
    this._cityService.register(this.city).subscribe({
      next: (response) => {

        // Mostrar el modal de éxito si se crea correctamente
        const modalEl = document.getElementById('successModal');
        if (modalEl) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
        }

        // Limpia el formulario después del registro exitoso
        form.resetForm();
      },
      error: (error) => {
        // Muestra en consola cualquier error ocurrido durante la creación
        console.error('Error al crear ciudad:', error);
      },
    });
  }

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta cuando el componente se inicializa
   */
  ngOnInit(): void {
    // Cargar todos los departamentos disponibles al iniciar el componente
    this.getAllDepartments();
  }

  /**
   * Obtiene todos los departamentos desde el servicio
   */
  getAllDepartments(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        // Asigna la respuesta al arreglo de departamentos
        this.departamentos = response;
      },
      error: (error) => {
        // Muestra un error en consola si no se pudieron obtener los departamentos
        console.error('Error al obtener departamentos:', error);
      },
    });
  }

  /**
   * Cierra el modal de éxito y navega a la página de gestión de ciudades
   */
  closeModal(): void {
    // Obtener el elemento del modal
    const modalEl = document.getElementById('successModal');

    // Verifica si existe el modal y si Bootstrap Modal está disponible
    if (modalEl && (window as any).bootstrap?.Modal) {
      // Obtener instancia del modal y ocultarlo
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();

      // Eliminar clases y elementos de fondo del modal
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }

    // Navegar a la ruta de gestión de ciudades
    this.router.navigate(['/managementCity']);
  }
}