import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

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
    this._departmentService.update(this.department.id!, this.department).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/managementDepartment']);
      },
      error => {
        console.error('Error al actualizar departamento:', error);
      }
    );
  }

}