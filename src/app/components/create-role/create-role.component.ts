import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css',
  providers: [RoleService]
})
export class CreateRoleComponent {
    public role: Role;
    
      constructor(private http: HttpClient, private _roleService: RoleService){
        this.role = new Role('')
      }
    
      onSubmit(form: NgForm): void {
        this._roleService.register(this.role).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(<any>error);
          }
        );
      }
}
