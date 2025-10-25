import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-city.component.html',
  styleUrls: ['./management-city.component.css'],
  providers: [CityService]
})
export class ManagementCityComponent implements OnInit {

  cities: City[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _cityService: CityService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._cityService.getAll().subscribe({
      next: (response: any) => {
        this.cities = response;
        console.log('Ciudades cargadas:', this.cities);
      },
      error: (error) => {
        console.error('Error al obtener ciudades:', error);
      }
    });
  }

  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  confirmDelete() {
    if (!this.selectedCityId) return;
    this._cityService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error)
    });
  }
  
}