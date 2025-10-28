import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css',
  providers: [ServiceService]
})
export class EditServiceComponent {

  public service: Service;
  public errorMessage: string = '';
  private successModal: any;
  private errorModal: any;

  constructor(
    private _serviceService: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.service = new Service('', true)
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
      this._serviceService.getOne(id).subscribe(
        response => {
          this.service = response;
          console.log('Servicio cargada:', this.service);
        },
        error => {
          console.error('Error al cargar servicio:', error);
          this._router.navigate(['/managementService']);
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

    this._serviceService.update(this.service.id!, this.service).subscribe(
      response => this.successModal.show(),
      error => {
        this.errorMessage = 'Error al actualizar la ciudad';
        this.errorModal.show();
      }
    );
  }

  closeModal(): void {
    this.successModal.hide();
    this._router.navigate(['/managementService']);
  }

}