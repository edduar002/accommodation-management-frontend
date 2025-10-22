import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service'; 

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css',
  providers: [HostService]
})
export class RegisterHostComponent {
  public host: Host;
  
    constructor(private http: HttpClient, private _hostService: HostService){
      this.host = new Host(1, '', '', '', '', '', new Date(), '', 1, '', 1)
    }
  
    onSubmit(form: NgForm): void {
      this.host.departmentsId = 1
      this._hostService.register(this.host).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
}
