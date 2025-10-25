import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

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
    this._serviceService.update(this.service.id!, this.service).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/managementService']);
      },
      error => {
        console.error('Error al actualizar servicio:', error);
      }
    );
  }

}