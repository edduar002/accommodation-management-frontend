import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-host',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './change-password-host.component.html',
  styleUrl: './change-password-host.component.css'
})
export class ChangePasswordHostComponent {

}
