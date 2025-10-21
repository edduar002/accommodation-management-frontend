import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-profile-admin.component.html',
  styleUrl: './edit-profile-admin.component.css'
})
export class EditProfileAdminComponent {

}
