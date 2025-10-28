import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
  providers: [DepartmentService]
})
export class EditDepartmentComponent {

  public department: Department;
  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;

  constructor(
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.department = new Department('', true)
  }

  ngOnInit(): void {
    this.getOne();
  }

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  getOne(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._departmentService.getOne(id).subscribe(
        response => {
          this.department = response;
          console.log('Departamento cargada:', this.department);
        },
        error => {
          console.error('Error al cargar departamento:', error);
          this._router.navigate(['/managementDepartment']);
        }
      );
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.errorModal.show();
      return;
    }

    this._departmentService.update(this.department.id!, this.department).subscribe(
      response => this.successModal.show(),
      error => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show();
      }
    );
  }

  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementDepartment']);
  }

}