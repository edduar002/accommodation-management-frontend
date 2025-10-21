import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './change-password-user.component.html',
  styleUrl: './change-password-user.component.css'
})
export class ChangePasswordUserComponent {

}
