import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-accommodations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-accommodations.component.html',
  styleUrl: './management-accommodations.component.css'
})
export class ManagementAccommodationsComponent {

}
