import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { CommentsComponent } from "../comments/comments.component";

declare var bootstrap: any;

@Component({
  selector: 'app-detail-accommodation',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './detail-accommodation.component.html',
  styleUrls: ['./detail-accommodation.component.css'],
  providers: [AccommodationService]
})
export class DetailAccommodationComponent implements OnInit, AfterViewInit {

  public accommodation!: Accommodation;
  public isLoading: boolean = true;
  public errorMessage: string = '';

  // Carrusel de imágenes estáticas (puedes cambiarlas según el alojamiento)
  public images: string[] = [
    'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/27/14/56/home-2178406_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/09/32/beach-1867889_1280.jpg'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.getAccommodation();
  }

  ngAfterViewInit(): void {
    const carouselEl = document.querySelector('#accommodationCarousel');
    if (carouselEl) {
      new bootstrap.Carousel(carouselEl, {
        interval: 3500,
        pause: 'hover'
      });
    }
  }

  /** 🔹 Obtener alojamiento por ID desde la API */
  getAccommodation(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._accommodationService.getOne(id).subscribe({
        next: (response) => {
          this.accommodation = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar alojamiento:', err);
          this.errorMessage = 'No se pudo cargar la información del alojamiento.';
          this.isLoading = false;
        }
      });
    });
  }
}