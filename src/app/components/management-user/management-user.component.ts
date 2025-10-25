import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css'],
  providers: [UserService]
})
export class ManagementUserComponent implements OnInit {

  users: User[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._userService.getAll().subscribe({
      next: (response: any) => {
        this.users = response;
        console.log('Usuarios cargadas:', this.users);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  confirmDelete() {
    if (!this.selectedCityId) return;
    this._userService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error)
    });
  }

}