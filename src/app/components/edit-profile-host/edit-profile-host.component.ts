import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-host',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-profile-host.component.html',
  styleUrl: './edit-profile-host.component.css'
})
export class EditProfileHostComponent {

}
