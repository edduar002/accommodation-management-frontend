import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-profile-user.component.html',
  styleUrl: './edit-profile-user.component.css'
})
export class EditProfileUserComponent {

}
