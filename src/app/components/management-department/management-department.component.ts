import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-department.component.html',
  styleUrls: ['./management-department.component.css'],
  providers: [DepartmentService],
})
export class ManagementDepartmentComponent implements OnInit {
  departments: Department[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departments = response;
        console.log('Departmentos cargadas:', this.departments);
      },
      error: (error) => {
        console.error('Error al obtener departments:', error);
      },
    });
  }

  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  confirmDelete() {
    if (!this.selectedCityId) return;
    this._departmentService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error),
    });
  }
}
