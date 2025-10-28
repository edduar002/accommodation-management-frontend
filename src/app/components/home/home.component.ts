import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AccommodationService]
})
export class HomeComponent implements OnInit {

  public accommodations: Accommodation[] = [];

  constructor(private _accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  /** 🔹 Cargar alojamientos desde la base de datos */
  loadAccommodations(): void {
    this._accommodationService.getAll().subscribe({
      next: (response) => {
        // opcional: podrías filtrar los “destacados” si hay una propiedad para eso
        this.accommodations = response.slice(0, 3); // solo los 3 primeros
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err);
      }
    });
  }

  /** 🔹 Retorna una imagen fija según el índice */
  getImage(index: number): string {
    const images = [
      'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/18/14/27/apartment-1835482_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/09/32/beach-1867889_1280.jpg'
    ];
    return images[index % images.length]; // ciclo si hay más de 3 alojamientos
  }
}