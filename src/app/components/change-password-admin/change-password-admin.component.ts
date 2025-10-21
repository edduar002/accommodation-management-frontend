import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './change-password-admin.component.html',
  styleUrl: './change-password-admin.component.css'
})
export class ChangePasswordAdminComponent {

}
