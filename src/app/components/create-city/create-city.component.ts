import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css'
})
export class CreateCityComponent {

}
