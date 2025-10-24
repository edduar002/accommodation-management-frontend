import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, NgForm  } from '@angular/forms';

@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css',
  providers: [CityService]
})
export class EditCityComponent {

  public city: City;

  constructor(
    private _cityService: CityService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.city = new City('', 1)
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];
      this._cityService.getOne(id).subscribe(
        response => {
          this.city = response;
          console.log('Ciudad cargada:', this.city);
        },
        error => {
          console.error('Error al cargar ciudad:', error);
          this._router.navigate(['/managementCity']);
        }
      );
    });
  }

  onSubmit(form: NgForm): void {
    this.city.departmentsId = 37;
    this._cityService.update(this.city.id!, this.city).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/managementCity']);
      },
      error => {
        console.error('Error al actualizar ciudad:', error);
      }
    );
  }

}
