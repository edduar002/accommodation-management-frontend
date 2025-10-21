import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-department',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-department.component.html',
  styleUrl: './management-department.component.css'
})
export class ManagementDepartmentComponent {

}
