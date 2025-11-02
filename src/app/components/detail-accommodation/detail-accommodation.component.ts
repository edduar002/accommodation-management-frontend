import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { CommentsComponent } from '../comments/comments.component';

declare var bootstrap: any;

@Component({
  selector: 'app-detail-accommodation',
  standalone: true,
  imports: [CommonModule, CommentsComponent, FormsModule],
  templateUrl: './detail-accommodation.component.html',
  styleUrls: ['./detail-accommodation.component.css'],
  providers: [AccommodationService],
})
export class DetailAccommodationComponent implements OnInit, AfterViewInit {
  public accommodation!: Accommodation;
  public isLoading: boolean = true;
  public errorMessage: string = '';
  public checkIn!: string;
  public checkOut!: string;
  public guests: number = 1;
  public totalPrice: number | null = null;

  // Carrusel de imágenes estáticas (puedes cambiarlas según el alojamiento)
  public images: string[] = [
    'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/27/14/56/home-2178406_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/09/32/beach-1867889_1280.jpg',
  ];

  constructor(
    private _route: ActivatedRoute,
    private _accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.getAccommodation();
  }

  calculateTotal(): void {
    if (!this.checkIn || !this.checkOut || !this.accommodation?.price) {
      return;
    }

    const start = new Date(this.checkIn);
    const end = new Date(this.checkOut);
    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    this.totalPrice = nights > 0 ? nights * this.accommodation.price : null;
  }

  ngAfterViewInit(): void {
    const carouselEl = document.querySelector('#accommodationCarousel');
    if (carouselEl) {
      new bootstrap.Carousel(carouselEl, {
        interval: 3500,
        pause: 'hover',
      });
    }
  }

  /** 🔹 Obtener alojamiento por ID desde la API */
  getAccommodation(): void {
    this._route.params.subscribe((params) => {
      const id = +params['id'];
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          this.accommodation = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar alojamiento:', err);
          this.errorMessage =
            'No se pudo cargar la información del alojamiento.';
          this.isLoading = false;
        },
      });
    });
  }
}
