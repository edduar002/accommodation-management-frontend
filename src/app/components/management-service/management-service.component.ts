import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-service',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './management-service.component.html',
  styleUrl: './management-service.component.css'
})
export class ManagementServiceComponent {

}
