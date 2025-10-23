import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-create-city',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-city.component.html',
  styleUrl: './create-city.component.css',
  providers: [CityService]
})
export class CreateCityComponent {
    public city: City;
    
      constructor(private http: HttpClient, private _cityService: CityService){
        this.city = new City('', 1)
      }
    
      onSubmit(form: NgForm): void {
        this.city.departmentsId = 1;
        this._cityService.register(this.city).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(this.city);
          }
        );
      }
}
