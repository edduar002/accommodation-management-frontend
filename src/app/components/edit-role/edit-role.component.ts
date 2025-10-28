import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

declare var bootstrap: any;

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
  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;

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

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
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
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos';
      this.errorModal.show();
      return;
    }

    this._roleService.update(this.role.id!, this.role).subscribe(
      response => this.successModal.show(),
      error => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show();
      }
    );
  }

  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementRole']);
  }

}