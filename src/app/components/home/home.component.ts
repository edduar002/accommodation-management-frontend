import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { FilterAlojamientoPipe } from '../../../pipes/FilterAlojamientoPipe';

// Declaración de variable global para modales de Bootstrap
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AccommodationService],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule, // Necesario para [(ngModel)]
    FilterAlojamientoPipe, // Pipe para filtrar alojamientos por búsqueda
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Array de alojamientos que se mostrarán en la página
  public accommodations: Accommodation[] = [];

  // Texto de búsqueda para filtrar alojamientos
  public searchText: string = '';

  // Mensaje de error para modales
  public errorMessage: string = '';

  // Referencias a modales de Bootstrap
  private successModal: any;
  private errorModal: any;

  /**
   * Constructor del componente
   * @param _accommodationService Servicio para obtener alojamientos
   */
  constructor(private _accommodationService: AccommodationService) {}

  /**
   * Método de Angular que se ejecuta al inicializar el componente
   * Carga todos los alojamientos desde el servicio
   */
  ngOnInit(): void {
    this.loadAccommodations();
  }

  /**
   * Método de Angular que se ejecuta después de renderizar la vista
   * Se utiliza para inicializar los modales de Bootstrap
   */
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

  /**
   * Cargar todos los alojamientos desde el servicio
   */
  loadAccommodations(): void {
    this._accommodationService.getAll().subscribe({
      next: (response) => {
        // Asignar lista de alojamientos obtenida
        this.accommodations = response;
      },
      error: (err) => {
        // Mostrar error en consola si falla la carga
        console.error('Error al cargar alojamientos:', err);
      },
    });
  }

  /**
   * Cerrar modal de éxito
   */
  closeModal(): void {
    this.successModal.hide();
  }
}