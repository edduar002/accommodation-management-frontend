import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register-administrator.component.html',
  styleUrl: './register-administrator.component.css'
})
export class RegisterAdministratorComponent {

}
