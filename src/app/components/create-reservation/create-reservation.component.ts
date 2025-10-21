import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {

}
