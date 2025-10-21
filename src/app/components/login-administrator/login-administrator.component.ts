import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-administrator.component.html',
  styleUrl: './login-administrator.component.css'
})
export class LoginAdministratorComponent {

}
