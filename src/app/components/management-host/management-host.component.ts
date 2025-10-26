import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-management-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-host.component.html',
  styleUrls: ['./management-host.component.css'],
  providers: [HostService]
})
export class ManagementHostComponent implements OnInit {

  hosts: Host[] = [];
  selectedCityId?: number;

  constructor(
    private http: HttpClient,
    private _hostService: HostService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this._hostService.getAll().subscribe({
      next: (response: any) => {
        this.hosts = response;
        console.log('Anfitriones cargadas:', this.hosts);
      },
      error: (error) => {
        console.error('Error al obtener anfitriones:', error);
      }
    });
  }
  
  openDeleteModal(id?: number) {
    if (!id) return;
    this.selectedCityId = id;
  }

  confirmDelete() {
    if (!this.selectedCityId) return;
    this._hostService.delete(this.selectedCityId).subscribe({
      next: () => {
        this.getAll();
        this.selectedCityId = undefined;
      },
      error: (error) => console.error(error)
    });
  }

}