import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';

declare var bootstrap: any;

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

  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;

  constructor(
    private _accommodationService: AccommodationService,
  ) {
  }

  ngOnInit(): void {
    this.loadAccommodations();
  }

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  loadAccommodations(): void {
    this._accommodationService.getAll().subscribe({
      next: (response) => {
        this.accommodations = response.slice(0, 3);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err);
      }
    });
  }

  getImage(index: number): string {
    const images = [
      'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/18/14/27/apartment-1835482_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/09/32/beach-1867889_1280.jpg'
    ];
    return images[index % images.length];
  }

  closeModal(): void {
    this.successModal.hide();
  }
}