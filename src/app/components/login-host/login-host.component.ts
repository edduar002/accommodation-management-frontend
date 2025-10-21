import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-host',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-host.component.html',
  styleUrl: './login-host.component.css'
})
export class LoginHostComponent {

}
