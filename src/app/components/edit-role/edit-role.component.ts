import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
  providers: [RoleService]
})
export class EditRoleComponent {

  public role: Role;

  constructor(
    private _roleService: RoleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.role = new Role('', true)
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._roleService.getOne(id).subscribe(
        response => {
          this.role = response;
          console.log('Rol cargada:', this.role);
        },
        error => {
          console.error('Error al cargar rol:', error);
          this._router.navigate(['/managementRole']);
        }
      );
    });
  }

  onSubmit(form: NgForm): void {
    this._roleService.update(this.role.id!, this.role).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/managementRole']);
      },
      error => {
        console.error('Error al actualizar rol:', error);
      }
    );
  }

}