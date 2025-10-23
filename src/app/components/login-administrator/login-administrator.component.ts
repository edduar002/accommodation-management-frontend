import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Administrator } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service'; 

@Component({
  selector: 'app-login-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-administrator.component.html',
  styleUrl: './login-administrator.component.css',
  providers: [AdministratorService]
})

export class LoginAdministratorComponent {
  public administrator: Administrator;
  
    constructor(private http: HttpClient, private _administratorService: AdministratorService){
      this.administrator = new Administrator('', '', '', '')
    }

    onSubmit(form: NgForm): void {
      this._administratorService.login(this.administrator).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
}
