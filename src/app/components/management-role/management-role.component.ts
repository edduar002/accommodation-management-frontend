import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-role',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-role.component.html',
  styleUrl: './management-role.component.css'
})
export class ManagementRoleComponent {

}
