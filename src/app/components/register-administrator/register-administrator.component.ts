import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Administrator } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service'; 


@Component({
  selector: 'app-register-administrator',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register-administrator.component.html',
  styleUrl: './register-administrator.component.css',
  providers: [AdministratorService]
})
export class RegisterAdministratorComponent {
  public administrator: Administrator;
  
    constructor(private http: HttpClient, private _administratorService: AdministratorService){
      this.administrator = new Administrator('', '', '', '')
    }
  
    onSubmit(form: NgForm): void {
      this._administratorService.register(this.administrator).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
}
