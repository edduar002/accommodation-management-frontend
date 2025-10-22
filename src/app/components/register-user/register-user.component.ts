import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  providers: [UserService]
})
export class RegisterUserComponent {
  public user: User;

  constructor(private http: HttpClient, private _userService: UserService){
    this.user = new User('', '', '', '', '', new Date(), '', 1, 1, new Date(), new Date(), true)
  }

  onSubmit(form: NgForm): void {
    this.user.departmentId = 1
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
