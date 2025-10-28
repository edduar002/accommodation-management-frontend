import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdministratorService } from '../../services/administrator.service';
import { Administrator } from '../../models/administrator';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-admin.component.html',
  styleUrls: ['./edit-profile-admin.component.css'],
  providers: [AdministratorService]
})
export class EditProfileAdminComponent implements OnInit, AfterViewInit {

  public admin: Administrator;
  public errorMessage: string = '';

  private successModal: any;
  private errorModal: any;

  constructor(
    private _adminService: AdministratorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa un administrador vacío
    this.admin = new Administrator('', '', '', '', 1);
  }

  ngOnInit(): void {
    this.getOne();
  }

  ngAfterViewInit(): void {
    // Inicializa los modales Bootstrap cuando el DOM ya está cargado
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  /** Cargar datos del administrador */
  getOne(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._adminService.getOne(id).subscribe(
        response => {
          this.admin = response;
        },
        error => {
          console.error('Error al cargar administrador:', error);
          this._router.navigate(['/']);
        }
      );
    });
  }

  /** Guardar cambios */
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      this.errorModal.show();
      return;
    }

    this._adminService.update(this.admin.id!, this.admin).subscribe(
      response => {
        this.successModal.show();
      },
      error => {
        this.errorMessage = 'Error al actualizar el perfil del administrador. Intenta nuevamente.';
        this.errorModal.show();
      }
    );
  }

  /** Cerrar modal y redirigir */
  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/']);
  }
}