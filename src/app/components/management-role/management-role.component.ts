import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-role.component.html',
  styleUrls: ['./management-role.component.css'],
  providers: [RoleService]
})
export class ManagementRoleComponent implements OnInit {

  roles: Role[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._roleService.getAll().subscribe({
      next: (response: any) => {
        this.roles = response;
        console.log('Roles cargadas:', this.roles);
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
    this._roleService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error)
    });
  }

}