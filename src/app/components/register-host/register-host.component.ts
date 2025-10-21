import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css'
})
export class RegisterHostComponent {

}
