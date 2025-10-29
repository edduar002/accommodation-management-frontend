import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-management-accommodations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-accommodations.component.html',
  styleUrls: ['./my-accommodations.component.css'],
  providers: [AccommodationService]
})
export class MyAccommodationsComponent implements OnInit {

  accommodations: Accommodation[] = [];
  selectedAccommodationId?: number;

  constructor(
    private http: HttpClient,
    private _accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._accommodationService.getAllOwn(1).subscribe({
      next: (response: any) => {
        this.accommodations = response;
        console.log('Alojamientos cargados:', this.accommodations);
      },
      error: (error) => {
        console.error('Error al obtener alojamientos:', error);
      }
    });
  }

  openDeleteModal(id?: number): void {
    if (!id) return;
    this.selectedAccommodationId = id;
  }

  confirmDelete(): void {
    if (!this.selectedAccommodationId) return;
    this._accommodationService.delete(this.selectedAccommodationId).subscribe({
      next: () => {
        this.getAll();
        this.selectedAccommodationId = undefined;
      },
      error: (error) => {
        console.error('Error al eliminar alojamiento:', error);
      }
    });
  }
}