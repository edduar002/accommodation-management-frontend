import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';
import { FilterAlojamientoPipe } from '../../../pipes/FilterAlojamientoPipe';

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
    FormsModule,              // ✅ Necesario para ngModel
    FilterAlojamientoPipe     // ✅ Necesario para usar el pipe
  ]
})
export class HomeComponent implements OnInit {

  public accommodations: Accommodation[] = [];
  public searchText: string = ''; // ✅ Filtro
  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;

  constructor(private _accommodationService: AccommodationService) {}

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
        this.accommodations = response;
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err);
      }
    });
  }

  closeModal(): void {
    this.successModal.hide();
  }
}