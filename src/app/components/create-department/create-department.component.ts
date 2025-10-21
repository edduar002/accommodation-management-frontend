import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css'
})
export class CreateDepartmentComponent {

}
