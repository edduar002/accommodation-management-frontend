import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css',
  providers: [DepartmentService]
})
export class CreateDepartmentComponent {
  public department: Department;
  
    constructor(private http: HttpClient, private _departmentService: DepartmentService){
      this.department = new Department('')
    }
  
    onSubmit(form: NgForm): void {
      this._departmentService.register(this.department).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
}
