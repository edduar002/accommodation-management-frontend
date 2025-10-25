import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-service.component.html',
  styleUrls: ['./management-service.component.css'],
  providers: [ServiceService]
})
export class ManagementServiceComponent implements OnInit {

  services: Service[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._serviceService.getAll().subscribe({
      next: (response: any) => {
        this.services = response;
        console.log('Roles cargadas:', this.services);
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  confirmDelete() {
    if (!this.selectedCityId) return;
    this._serviceService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error)
    });
  }

}