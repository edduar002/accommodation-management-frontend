import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css',
  providers: [ServiceService]
})
export class CreateServiceComponent {
  public service: Service;
  
    constructor(private http: HttpClient, private _serviceService: ServiceService){
      this.service = new Service('')
    }
  
    onSubmit(form: NgForm): void {
      this._serviceService.register(this.service).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
}
