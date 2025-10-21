import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-city.component.html',
  styleUrl: './management-city.component.css'
})
export class ManagementCityComponent {

}
