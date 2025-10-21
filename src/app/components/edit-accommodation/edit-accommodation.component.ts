import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-accommodation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-accommodation.component.html',
  styleUrl: './edit-accommodation.component.css'
})
export class EditAccommodationComponent {

}
