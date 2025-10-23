import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.service';

@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-accommodation.component.html',
  styleUrl: './create-accommodation.component.css',
  providers: [AccommodationService]
})
export class CreateAccommodationComponent {
  public accommodation: Accommodation;
      
    constructor(private http: HttpClient, private _accommodationService: AccommodationService){
      this.accommodation = new Accommodation('', '', '', 0, 0, 1, true, 1, 1, true);
    }
      
    onSubmit(form: NgForm): void {
      this.accommodation.departmentsId = 1;
      this.accommodation.hostsId = 1;
      this.accommodation.available = true;
      this.accommodation.active = true;

      this._accommodationService.register(this.accommodation).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(this.accommodation);
        }
      );
    }
}
