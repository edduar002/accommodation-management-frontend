import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Host } from '../../models/host';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-login-host',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-host.component.html',
  styleUrl: './login-host.component.css',
  providers: [HostService]
})

export class LoginHostComponent {
  public host: Host;
  
    constructor(private http: HttpClient, private _hostService: HostService){
      this.host = new Host('', '', '', '', '', new Date(), '', 1, '', 1)
    }

  onSubmit(form: NgForm): void {
    this._hostService.login(this.host).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
