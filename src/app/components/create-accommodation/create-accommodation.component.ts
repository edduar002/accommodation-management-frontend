import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-accommodation.component.html',
  styleUrl: './create-accommodation.component.css'
})
export class CreateAccommodationComponent {

}
