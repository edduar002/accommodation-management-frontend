import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '../../services/city.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { City } from '../../models/city';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css'],
  providers: [CityService, DepartmentService],
})
export class EditCityComponent implements OnInit, AfterViewInit {
  public city: City;
  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;
  departamentos: Department[] = [];

  constructor(
    private _cityService: CityService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _departmentService: DepartmentService,
  ) {
    this.city = new City('', 1, true);
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.getOne();
  }

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  /** Cargar departamentos */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      response => this.departamentos = response,
      error => console.error('Error al cargar departamentos', error)
    );
  }

  getOne(): void {
    this._route.params.subscribe(params => {
      const id = + params['id'];
      this._cityService.getOne(id).subscribe(
        response => this.city = response,
        error => this._router.navigate(['/managementCity'])
      );
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.errorModal.show();
      return;
    }

    this._cityService.update(this.city.id!, this.city).subscribe(
      response => this.successModal.show(),
      error => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show();
      }
    );
  }

  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementCity']);
  }
}