import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HostService } from '../../services/host.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { Host } from '../../models/host';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile-host',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-host.component.html',
  styleUrls: ['./edit-profile-host.component.css'],
  providers: [HostService, DepartmentService]
})
export class EditProfileHostComponent implements OnInit, AfterViewInit {

  public host: Host;
  departamentos: Department[] = [];
  public errorMessage: string = '';

  private successModal: any;
  private errorModal: any;

  constructor(
    private _hostService: HostService,
    private _departmentService: DepartmentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    // Inicializa el host vacío
    this.host = new Host('', '', '', '', '', new Date(), '', 1, '', 1, 1, true);
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.getOne();
  }

  ngAfterViewInit(): void {
    // Inicializa los modales Bootstrap cuando el DOM ya está cargado
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  }

  /** Cargar departamentos */
  loadDepartments(): void {
    this._departmentService.getAll().subscribe(
      response => this.departamentos = response,
      error => console.error('Error al cargar departamentos', error)
    );
  }

  /** Cargar datos del host */
  getOne(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._hostService.getOne(id).subscribe(
        response => {
          this.host = response;
        },
        error => {
          console.error('Error al cargar host:', error);
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

    this._hostService.update(this.host.id!, this.host).subscribe(
      response => {
        this.successModal.show();
      },
      error => {
        this.errorMessage = 'Error al actualizar el perfil del anfitrión. Intenta nuevamente.';
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